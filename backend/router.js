// Import route methods from controller
import { signUpWithEmail, signInWithEmail, heartbeat, addApplication, updateApplication, approveAccount, getUserInfo, getApplications, getStudents, getAccounts } from './controller.js';

// Routes
const router = (app) => {
    // Sign in to a user using an email and password
    app.post('/api/signin', signInWithEmail);

    // Sign up for a new user using an email and password
    app.post('/api/signup', signUpWithEmail);

    // Heartbeat to get applications, status, and sign-in status
    // app.get('/api/heartbeat', heartbeat);

    app.post('/api/application', addApplication);

    app.get('/api/applications', getApplications);
    app.get('/api/accounts', getUserInfo);
    app.get('/api/accounts/students', getStudents);
    app.get('/api/accounts/non-students', getAccounts);

    app.post('/api/application/update', updateApplication);

    app.post('/api/accounts/approve', approveAccount);
}

// Export router
export default router;
