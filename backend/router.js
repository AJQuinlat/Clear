// Import route methods from controller
import {signUp} from './controller.js';

// Routes
const router = (app) => {
    app.post('/api/sign-up', signUp);
}

// Export router
export default router;
