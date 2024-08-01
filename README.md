# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# FRONT-END END-POINTS:

1. / --> Home Page
2. /register --> Register page. [ Required : userName, email, password ]
3. /login --> Login page. [ Required : email, password ]
4. /password-reset --> Verify user email and send password reset token with url. [ Required : email ]
5. /verify-token/:passResetToken  --> Verify token and redirect to update password page.
6. /password-reset/:passResetToken --> Update new Password. [ Required : newPassword ]

PRIVATE-ROUTE:
7. /user --> Get logged in user detail.
8. /logout --> Logout user by deleting auth-Token from header.
