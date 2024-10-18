function calculateTimeDifference(startDate) {
    const now = new Date();
    const start = new Date(startDate);

    let diffYears = now.getFullYear() - start.getFullYear();
    let diffMonths = now.getMonth() - start.getMonth();
    let diffDays = now.getDate() - start.getDate();

    if (diffDays < 0) {
        diffMonths--;
        diffDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }

    return { years: diffYears, months: diffMonths, days: diffDays };
}

document.addEventListener("DOMContentLoaded", () => {
    const startDate = '2004-08-17';  // Set your start date here
    const { years, months, days } = calculateTimeDifference(startDate);
    document.getElementById('result').innerText = `${years} years, ${months} months, and ${days} days`;
});
