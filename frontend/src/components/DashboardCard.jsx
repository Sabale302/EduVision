import dashboard from '../images/dashboard.png';

export const dashboardCards = [
    { title: "Financial Dashboard", link: dashboard },
    { title: "Principal Dashboard", link: dashboard },
    { title: "HOD Dashboard", link: dashboard },
    {   title: "Faculty Analytical Dashboard", 
        link: "https://app.powerbi.com/view?r=eyJrIjoiZDM3OGE2M2YtZmI3Yy00NzVlLThkNjMtYzcxMWYzODlhOWM1IiwidCI6ImIxMWIxNTJkLWYxMzctNDhmYi04MDI0LTE5MTk4NDMwNTM0YyJ9" ,  isPowerBI: true },
    { title: "Student Performance Dashboard", link: dashboard },
    { title: "Student Profile Dashboard", link: dashboard },
    { 
        title: "Placement Dashboard", 
        link: "https://app.powerbi.com/view?r=eyJrIjoiZGNkYzU0YjItZTZhNi00YzVmLTk2NmYtNGQzNzE1YTNmOGY4IiwidCI6IjJkMDg4YTQ3LTZiODItNDlkNS1hYTY5LWZjZDFjNDdlZTdlZCJ9", 
        isPowerBI: true // Add flag to indicate Power BI dashboard
    }
];
