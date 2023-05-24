// Import route methods from controller
import {signUp, logIn} from './controller.js';

// Routes
const router = (app) => {
    app.post('/api/sign-up', signUp);
    app.post('/api/log-in', logIn);
}

// Export router
export default router;
