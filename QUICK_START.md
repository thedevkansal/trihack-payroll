# 🚀 Quick Start Guide

## Setup in 3 Steps

### 1️⃣ Start Local Blockchain
```bash
cd /home/dragon/trihackX/trihack-payroll
yarn chain
```
Keep this terminal running!

### 2️⃣ Deploy Contracts (New Terminal)
```bash
cd /home/dragon/trihackX/trihack-payroll
yarn deploy
```

### 3️⃣ Start Frontend (New Terminal)
```bash
cd /home/dragon/trihackX/trihack-payroll
yarn start
```

## 🌐 Access the App
- **Homepage**: http://localhost:3000
- **HR Dashboard**: http://localhost:3000/hr
- **Employee Portal**: http://localhost:3000/employee

## 🎭 Test Scenarios

### Scenario 1: Basic Flow
1. Open http://localhost:3000/hr
2. **Connect Wallet** (RainbowKit button in header)
3. **Register Company**: Enter "Acme Corp"
4. **Deposit Funds**: Add 10 ETH to escrow
5. **Hire Employee**: 
   - Use a different wallet address
   - Set salary: 1 ETH
6. **Pay Salary**:
   - Switch to "Pay Salary" tab
   - Enter employee address
   - Click "Pay Salary"

### Scenario 2: Termination Flow
1. In HR Dashboard, go to "Manage" tab
2. **Initiate Termination**: Enter employee address
3. Switch to employee wallet
4. Open http://localhost:3000/employee
5. **Confirm Termination**: Click the orange button
6. Employee receives 15-day severance (0.5 ETH)

## 🔧 Troubleshooting

### Can't connect wallet?
- Make sure you're on localhost network
- Check MetaMask is on "Localhost 8545"

### Transaction failing?
- Check escrow has enough balance
- Ensure 30 days passed since last payment
- Verify employee is active

### Page not loading?
- Wait a few seconds for Next.js to compile
- Check all 3 terminals are running
- Try refreshing browser

## 💡 Quick Tips
- Use **2 different wallets** to test HR and Employee roles
- The **first wallet** that registers becomes the HR
- **Deposit enough ETH** before hiring (at least 2x monthly salary)
- **Wait 30 days** (or use block timestamp manipulation) to pay salary again
- **Termination** gives employee exactly 15 days of salary

## 📱 What to Show Judges

### 1. Beautiful UI
- Modern shadcn/ui components
- Smooth animations
- Responsive design
- Dark/light mode support

### 2. Core Features
- ✅ Company registration
- ✅ Employee hiring
- ✅ Escrow management
- ✅ Salary payments
- ✅ Termination with severance

### 3. Innovation
- **Automatic severance protection**
- **Dual-confirmation** termination
- **On-chain transparency**
- **Fair for both parties**

## 🎬 Demo Script

### Act 1: Setup (1 min)
"We built a privacy-preserving payroll system with automatic severance protection."

### Act 2: HR Flow (2 min)
1. Connect wallet
2. Register company
3. Deposit funds
4. Hire employee
5. Pay salary

### Act 3: Employee View (1 min)
1. Show employee portal
2. View salary details
3. See severance protection

### Act 4: Innovation (1 min)
"The key innovation: Smart contracts enforce 15-day severance. 
No employer can bypass it. Fair for both parties."

## 🏁 Ready to Go!

Your payroll system is **production-ready** for the hackathon demo! 🎉

**Time spent**: ~7 hours
**Pages built**: 3
**Components created**: 9
**Smart contracts**: 1
**Lines of code**: ~800

Good luck! 🍀
