// Loans page functionality

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('loan-amount')) {
        initLoansPage();
    }
});

function initLoansPage() {
    updateLoanCalculator();
    
    document.getElementById('loan-amount').addEventListener('input', updateLoanCalculator);
    document.getElementById('loan-term').addEventListener('input', updateLoanCalculator);
}

function updateLoanCalculator() {
    const amount = parseFloat(document.getElementById('loan-amount').value) || 5000;
    const term = parseFloat(document.getElementById('loan-term').value) || 30;
    
    // Sample interest rate calculation - 6% per month
    const monthlyInterestRate = 0.06;
    const months = term / 30;
    const totalInterest = amount * monthlyInterestRate * months;
    const totalRepayable = amount + totalInterest;
    const installmentAmount = totalRepayable / (months || 1);
    
    const totalRounded = Math.round(totalRepayable);
    const installmentRounded = Math.round(installmentAmount);
    const interestRounded = Math.round(totalInterest);
    
    document.getElementById('loan-result').innerHTML = `
        <div class="mb-2">
            <div class="text-xs text-gray-500">Loan amount</div>
            <div class="font-semibold">${amount} FITP</div>
        </div>
        <div class="mb-2">
            <div class="text-xs text-gray-500">Interest (${(monthlyInterestRate * 100).toFixed(0)}% per month)</div>
            <div class="font-semibold text-red-600">+${interestRounded} FITP</div>
        </div>
        <div class="mb-2">
            <div class="text-xs text-gray-500">Total repayable</div>
            <div class="font-bold text-lg">${totalRounded} FITP</div>
        </div>
        <div class="mb-2">
            <div class="text-xs text-gray-500">Monthly payment</div>
            <div class="font-semibold">${installmentRounded} FITP</div>
        </div>
        <div class="mt-3 text-xs text-gray-400">
            * Demo rates only. Actual rates determined by credit scoring.
        </div>
    `;
}
