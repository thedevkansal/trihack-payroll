# 🚀 Network Setup Guide

## ✅ Your Contract is Deployed!

**Contract Address:** `0x5FbDB2315678afecb367f032d93F642f64180aa3`  
**Network:** Foundry (Local Anvil)  
**Chain ID:** `31337`  
**RPC URL:** `http://127.0.0.1:8545`

---

## 📱 How to Connect Your Wallet

### Option 1: Add Foundry Network to MetaMask

1. **Open MetaMask** and click on the network dropdown at the top
2. **Click "Add Network"** or "Add a network manually"
3. **Enter the following details:**
   - **Network Name:** `Foundry Local`
   - **RPC URL:** `http://127.0.0.1:8545`
   - **Chain ID:** `31337`
   - **Currency Symbol:** `ETH`
   - **Block Explorer URL:** (leave empty)

4. **Click "Save"**
5. **Switch to Foundry Local** network from the dropdown

### Option 2: Import a Test Account

You can import one of these pre-funded test accounts (each has 10,000 ETH):

**Account 1 (Deployer - for HR testing):**
- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

**Account 2 (for Employee testing):**
- Address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- Private Key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`

**Account 3 (for Additional Employee):**
- Address: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
- Private Key: `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`

**To Import:**
1. Open MetaMask
2. Click on account icon → "Import Account"
3. Paste the private key
4. Click "Import"

---

## 🧪 Testing Workflow

### Step 1: HR Account Setup (Account 1)
1. Connect with Account 1 (`0xf39Fd...`)
2. Go to `/hr` page
3. Register your company
4. Deposit funds to escrow (e.g., 10 ETH)

### Step 2: Hire Employees
1. Still on HR dashboard
2. Go to "Hire Employee" tab
3. Use Account 2 address as employee
4. Set monthly salary (e.g., 1 ETH)
5. Click "Hire Employee"

### Step 3: Employee View (Account 2)
1. Switch MetaMask to Account 2
2. Go to `/employee` page
3. View your employment status and salary details

### Step 4: Test Salary Payment
1. Switch back to Account 1 (HR)
2. Go to HR dashboard
3. Go to "Pay Salary" tab
4. Enter employee address (Account 2)
5. Click "Pay Salary"

### Step 5: Test Termination Flow
1. As HR (Account 1), initiate termination
2. Switch to Employee account (Account 2)
3. Confirm termination to receive 15-day severance

---

## 🐛 Troubleshooting

### "Wrong Network" Error
- Make sure you've added the Foundry network (Chain ID 31337)
- Switch to "Foundry Local" in MetaMask
- The frontend will show a button to switch networks

### "Insufficient Funds" Error
- Import one of the test accounts listed above
- Each account has 10,000 ETH pre-funded

### Contract Not Found
- Make sure Anvil is running: `yarn chain`
- The contract should be at: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

### Page Not Loading
- Refresh the browser
- Clear MetaMask activity data: Settings → Advanced → Clear activity tab data
- Restart the Next.js dev server: `yarn start`

---

## 📝 Quick Commands

```bash
# Terminal 1: Start local blockchain
yarn chain

# Terminal 2: Start frontend (in another terminal)
yarn start

# Deploy contracts (if needed)
cd packages/foundry
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

---

## 🎯 Current Status

✅ Anvil blockchain running on port 8545  
✅ PayrollEscrow contract deployed  
✅ Frontend running on http://localhost:3000  
⏳ **Next Step:** Add Foundry network to your wallet and start testing!
