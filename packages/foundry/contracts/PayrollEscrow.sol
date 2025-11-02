// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract PayrollEscrow {
    struct Employee {
        address employeeAddress;
        uint256 monthlySalary;
        uint256 startDate;
        uint256 lastPaymentDate;
        bool isActive;
        bool terminationInitiated;
        address initiatedBy;
        uint256 terminationDate;
    }

    struct Company {
        address hrWallet;
        string companyName;
        uint256 escrowBalance;
    }

    mapping(address => Employee) public employees;
    mapping(address => Company) public companies;

    uint256 constant DAYS_IN_MONTH = 30;

    event EmployeeHired(address indexed company, address indexed employee, uint256 salary);
    event TerminationInitiated(address indexed initiator, address indexed employee);
    event TerminationConfirmed(address indexed employee, uint256 severancePaid);
    event SalaryPaid(address indexed employee, uint256 amount);

    modifier onlyHR(address company) {
        require(companies[company].hrWallet == msg.sender, "Not authorized HR");
        _;
    }

    modifier onlyEmployee() {
        require(employees[msg.sender].isActive, "Not an active employee");
        _;
    }

    // HR registers company
    function registerCompany(string memory _companyName) external {
        companies[msg.sender] = Company({hrWallet: msg.sender, companyName: _companyName, escrowBalance: 0});
    }

    // HR approves employee application
    function hireEmployee(address _employeeAddress, uint256 _monthlySalary) external payable onlyHR(msg.sender) {
        require(!employees[_employeeAddress].isActive, "Already hired");
        require(msg.value >= _monthlySalary, "Insufficient escrow deposit");

        employees[_employeeAddress] = Employee({
            employeeAddress: _employeeAddress,
            monthlySalary: _monthlySalary,
            startDate: block.timestamp,
            lastPaymentDate: block.timestamp,
            isActive: true,
            terminationInitiated: false,
            initiatedBy: address(0),
            terminationDate: 0
        });

        // Deposit goes directly to escrow
        companies[msg.sender].escrowBalance += msg.value;

        emit EmployeeHired(msg.sender, _employeeAddress, _monthlySalary);
    }

    // HR or Employee initiates termination
    function initiateTermination(address _employee) external {
        Employee storage emp = employees[_employee];
        require(emp.isActive, "Employee not active");
        require(msg.sender == emp.employeeAddress || companies[msg.sender].hrWallet == msg.sender, "Not authorized");

        emp.terminationInitiated = true;
        emp.initiatedBy = msg.sender;
        emp.terminationDate = block.timestamp;

        emit TerminationInitiated(msg.sender, _employee);
    }

    // Confirmation by the other party triggers severance
    function confirmTermination() external onlyEmployee {
        Employee storage emp = employees[msg.sender];
        require(emp.terminationInitiated, "No termination initiated");
        require(emp.initiatedBy != msg.sender, "Cannot confirm own termination");

        // Calculate severance (15 days of salary)
        uint256 SEVERANCE_DAYS = (block.timestamp - emp.startDate) / 24 * 60 * 60;
        uint256 severancePay = (emp.monthlySalary * SEVERANCE_DAYS) / DAYS_IN_MONTH;

        // Find company wallet
        address companyWallet = findCompanyByEmployee(msg.sender);
        require(companies[companyWallet].escrowBalance >= severancePay, "Insufficient escrow");

        // Transfer severance
        companies[companyWallet].escrowBalance -= severancePay;
        payable(msg.sender).transfer(severancePay);

        emp.isActive = false;

        emit TerminationConfirmed(msg.sender, severancePay);
    }

    // Monthly salary payment
    function paySalary(address _employee) external {
        Employee storage emp = employees[_employee];
        require(emp.isActive, "Employee not active");

        uint256 timeSinceLastPayment = (block.timestamp - emp.lastPaymentDate) / 24 * 60 * 60;
        require(timeSinceLastPayment >= 30, "Payment not due yet");

        address companyWallet = findCompanyByEmployee(_employee);
        require(companies[companyWallet].escrowBalance >= emp.monthlySalary, "Insufficient funds");

        companies[companyWallet].escrowBalance -= emp.monthlySalary;
        payable(_employee).transfer(emp.monthlySalary);
        emp.lastPaymentDate = block.timestamp;

        emit SalaryPaid(_employee, emp.monthlySalary);
    }

    function findCompanyByEmployee(address _employee) internal view returns (address) {
        // Simplified - in production use mapping
        return employees[_employee].employeeAddress; // Replace with actual company lookup
    }
}
