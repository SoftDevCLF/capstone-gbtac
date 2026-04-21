# Smart Building Energy Optimization and Performance Analytics System

![Status](https://img.shields.io/badge/Status-Completed-success)
![Project](https://img.shields.io/badge/Capstone-Project-blueviolet)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

A centralized web-based platform designed to collect, process, and visualize building performance data in real time and historically. This system empowers users to monitor energy usage, optimize efficiency, and make data-driven decisions through interactive dashboards and reporting tools.

## Overview

The Smart Building Energy Optimization and Performance Analytics System platform provides actionable insights into building operations by aggregating key metrics such as:

- Energy consumption
- Water usage
- Natural gas usage
- Temperature data
- Forecasting trends

The platform transforms raw data into meaningful visualizations, enabling efficient monitoring and optimization of building performance.

## Features

- **Authentication & Security**
  - Firebase Authentication (email/password)
  - Cloudflare Turnstile CAPTCHA integration for bot protection
  - Role-based access control
  - Protected routes based on user roles
    
- **User Roles**
  - _Admin Account_
    - Manage user accounts

  - _Staff Account_
    - Access to guest views
    - Dedicated welcome page
    - Manage assigned accounts
    - Access operational dashboards
    - Save charts and export them to pdfs
    - Generate, save and print reports
    - Update profile and password

  - _Guest Account_
    - View Landing Page
    - View Meet our Devs
    - View About Us
    - View energy trends and analytics only

- **Interactive Dashboard**
  - Real-time and historical data visualization
  - Dynamic charts and graphs
  - Custom date range selection
  - Aggregated data views for better analysis
  - Reporting & Exporting
  - Generate detailed reports
  - Export data as PDF for sharing and documentation
  - Custom charts

- **Forecasting and Predictive Insights**
  - Time-series forecasting powered by Prophet
  - Trend analysis for energy, water, and gas usage
  - Data-driven projections for smarter planning

- **Unit Conversion**
  - Toggle between measurement units (e.g., kWh ↔ W)
  - Consistent updates across all dashboard components

- **Data Summaries**
  - Carousel-based metric cards
  - Quick overview of key performance indicators

- **Date Filtering & Aggregation**
  - Flexible date picker
  - Data grouping by time intervals

## Demo Preview

Coming soon

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Prophet](https://img.shields.io/badge/Forecasting-Prophet-blue)
![Cloudflare](https://img.shields.io/badge/Turnstile-CAPTCHA-orange)

- Frontend
  - Next.js (React framework)
  - Tailwind CSS for styling
  - Data aggregation and transformation pipelines
    
- Backend / Data Handling
  - API-driven architecture
  - Data processing and aggregation logic

- Forecasting
  - Python + Prophet for time-series prediction
    
- Authentication
  - Firebase Authentication (email/password login)
  - Cloudflare Turnstile CAPTCHA
 
- Visualization
  - Charting libraries for real-time and historical insights

## Key Concepts
- Real-time data streaming and visualization
- Role-based access control (Admin / Staff / Guest)
- Secure authentication and protected routing
- Time-series aggregation and filtering
- Predictive modeling using historical datasets
- Scalable and modular frontend architecture

## Project Structure (Simplified)

```bash
/app
  /components      # Reusable UI components
  /dashboard       # Main analytics dashboard
  /auth            # Login & authentication
  /utils           # Helper functions and services
/public            # Static assets
```

## Code Snippets

### Turnstile CAPTCHA Integration

```bash
import Turnstile from "react-turnstile";

<Turnstile
  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
  onVerify={(token) => setCaptchaToken(token)}
/>
```

### Custom Data Aggregation

```bash
const aggregateData = (data, interval) => {
  return data.reduce((acc, item) => {
    const key = formatDate(item.timestamp, interval);
    acc[key] = (acc[key] || 0) + item.value;
    return acc;
  }, {});
};
```

### Unit Toggle Logic

```bash
const convertUnits = (value, unit) => {
  return unit === "kWh" ? value / 1000 : value * 1000;
};
```

## Future Improvements
- Advanced anomaly detection
- Real-time alerting system
- Mobile optimization
- Enhanced forecasting models

## License

This project is intended for educational and portfolio purposes.

## Development Team

- Frontend Developer: Temi Bankole [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?logo=github)]((https://github.com/Temsters)) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://www.linkedin.com/in/temi-bankole-/)
- Frontend Developer: Cintya Lara Flores [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?logo=github)]((https://github.com/SoftDevCLF)) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://www.linkedin.com/in/cintya-l-a570622a3/)
- Backend Developer: Dominique Ann Lee [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?logo=github)]((https://github.com/monic421)) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://www.linkedin.com/in/dominique-anne-l-3a3748377/)
- Database / Backend Developer: Kiera Johnson [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?logo=github)]((https://github.com/kj7639)) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://www.linkedin.com/in/kiera-johnson-9a1405336/)
- Backend Developer : Anna Isabelle Yabut [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?logo=github)]((https://github.com/isayabs)) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://www.linkedin.com/in/anna-yabut-817b91341/)

## Contributions
This project is part of an academic capstone and is not actively accepting external contributions.


