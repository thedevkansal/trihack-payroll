# 🔐 Privacy-Preserving Payroll System

A decentralized payroll escrow system with built-in severance protection, ensuring fair treatment for both employers and employees through smart contracts.

## 🌟 Features

### For Employers (HR)

- ✅ Register company on-chain
- ✅ Hire employees with defined salaries
- ✅ Deposit funds to escrow for transparency
- ✅ Process monthly salary payments
- ✅ Initiate employee termination with built-in fairness

### For Employees

- ✅ View employment status and salary details
- ✅ Automatic severance protection (15 days salary)
- ✅ Dual-confirmation termination process
- ✅ Transparent payment tracking

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- Yarn
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH (for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/thedevkansal/trihack-payroll.git
cd trihack-payroll

# Install dependencies
yarn install
```

### Running Locally (Anvil)

```bash
# Terminal 1: Start local blockchain
cd packages/foundry
make chain

# Terminal 2: Deploy contracts
yarn deploy

# Terminal 3: Start frontend
yarn start
```

Visit http://localhost:3000

### Using Sepolia Testnet

The contract is already deployed on Sepolia:

- **Address**: `0x19347546D21f0F3Ed86aD4D8766C7467362c2F10`
- **Explorer**: https://sepolia.etherscan.io/address/0x19347546d21f0f3ed86ad4d8766c7467362c2f10

```bash
# Just start the frontend
yarn start
```

Make sure your wallet is connected to Sepolia testnet!

## 📱 User Guide

### HR Dashboard (`/hr`)

1. **Register Company**

   - Enter company name
   - Transaction creates company record on-chain

2. **Hire Employees**

   - Enter employee wallet address
   - Set monthly salary in ETH
   - Employee becomes active immediately

3. **Deposit to Escrow**

   - Add funds to company escrow
   - Ensures you can pay salaries
   - Balance visible on dashboard

4. **Pay Salary**

   - Enter employee address
   - System calculates monthly amount
   - Can only pay once per 30-day period

5. **Manage Termination**
   - Initiate termination for any employee
   - Requires employee confirmation
   - Automatic severance calculation

### Employee Portal (`/employee`)

1. **View Employment Status**

   - Check if you're hired
   - View monthly salary
   - See start date and last payment

2. **Severance Protection**

   - Automatic 15-day severance
   - Protected by smart contract
   - Cannot be bypassed

3. **Confirm Termination**
   - If HR initiates termination
   - You must confirm to receive severance
   - Funds automatically transferred

## 🏗️ Project Structure

```
trihack-payroll/
├── packages/
│   ├── foundry/           # Smart contracts
│   │   ├── contracts/
│   │   │   └── PayrollEscrow.sol
│   │   ├── script/
│   │   └── test/
│   └── nextjs/            # Frontend
│       ├── app/
│       │   ├── hr/        # HR Dashboard
│       │   └── employee/  # Employee Portal
│       ├── components/
│       │   └── ui/        # shadcn/ui components
│       └── contracts/     # Generated ABIs
```

## 🛠️ Technology Stack

### Smart Contracts

- **Solidity** 0.8.30
- **Foundry** - Development framework
- **OpenZeppelin** - Security standards

### Frontend

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **wagmi** - Ethereum hooks
- **RainbowKit** - Wallet connection
- **viem** - Ethereum interactions

## 📝 Smart Contract

### Key Functions

```solidity
// HR Functions
function registerCompany(string memory _companyName) external
function hireEmployee(address _employee, uint256 _monthlySalary) external
function depositToEscrow() external payable
function paySalary(address _employee) external
function initiateTermination(address _employee) external

// Employee Functions
function confirmTermination() external

// View Functions
function companies(address) external view returns (Company)
function employees(address) external view returns (Employee)
```

### Severance Calculation

```
Severance = (Monthly Salary * 15) / 30
```

Employee receives 15 days worth of their monthly salary upon confirmed termination.

## 🔒 Security Features

- ✅ Dual-confirmation termination (both parties must agree)
- ✅ Escrow system ensures funds availability
- ✅ Time-locked salary payments (30 days minimum)
- ✅ On-chain verification and transparency
- ✅ Immutable severance protection

## 🌐 Deployment

### Sepolia Testnet (Current)

- Network: Sepolia
- Chain ID: 11155111
- Contract: `0x19347546D21f0F3Ed86aD4D8766C7467362c2F10`
- Explorer: [View on Etherscan](https://sepolia.etherscan.io/address/0x19347546d21f0f3ed86ad4d8766c7467362c2f10)

### Deploy to Other Networks

```bash
# Deploy to Sepolia
cd packages/foundry
forge script script/Deploy.s.sol --rpc-url sepolia --broadcast --verify

# Deploy to Arbitrum Sepolia
forge script script/Deploy.s.sol --rpc-url arbitrumSepolia --broadcast --verify
```

## 🧪 Testing

```bash
# Run contract tests
cd packages/foundry
forge test

# Run with verbosity
forge test -vvv

# Run specific test
forge test --match-test testRegisterCompany
```

## 🎯 Use Cases

1. **Startups** - Transparent payroll for small teams
2. **DAOs** - Decentralized organization payments
3. **Freelancers** - Contract work with built-in protection
4. **International Teams** - Borderless payments
5. **Auditable Payroll** - Compliance and transparency

## 🔮 Future Enhancements

- [ ] Multi-currency support (USDC, USDT, DAI)
- [ ] Role-based access control
- [ ] Batch salary payments
- [ ] Payment scheduling automation
- [ ] Employee attendance tracking
- [ ] Tax calculation and reporting
- [ ] Cross-chain deployment (Nexus SDK integration)
- [ ] Homomorphic encryption for salary privacy (FHE)

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md)
- [Network Setup](NETWORK_SETUP.md)
- [Sepolia Deployment](SEPOLIA_DEPLOYMENT.md)
- [Frontend Guide](FRONTEND_GUIDE.md)
- [Contributing](CONTRIBUTING.md)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🏆 Hackathon

Built for **TriHack** hackathon in 7 hours by a team of 3.

**Core Idea**: Payroll escrow with automatic 15-day severance protection for employees who lose their jobs or voluntarily leave, ensuring fair treatment for both parties.

## 🆘 Support

- **Issues**: GitHub Issues
- **Docs**: Check `/docs` folder
- **Contract Explorer**: [Sepolia Etherscan](https://sepolia.etherscan.io/address/0x19347546d21f0f3ed86ad4d8766c7467362c2f10)

## ⚠️ Disclaimer

This is a proof-of-concept built for a hackathon. Not audited. Use at your own risk. Do not use in production without proper security audit.

---

**Built with ❤️ using Scaffold-ETH 2**

Made for TriHack 2025 🚀
