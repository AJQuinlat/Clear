// Import route methods from controller
import {signUpWithEmail, signInWithEmail, heartbeat} from './controller.js';

// Routes
const router = (app) => {
    // Sign in to a user using an email and password
    app.post('/api/signin', signInWithEmail);

    // Sign up for a new user using an email and password
    app.post('/api/signup', signUpWithEmail);

    // Heartbeat to get applications, status, and sign-in status
    app.get('/api/heartbeat', heartbeat);
}

// Export router
export default router;
