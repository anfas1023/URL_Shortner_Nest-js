// types/express.d.ts
import { User } from '../../schema/User.schema'; // Adjust the import path accordingly

declare global {
  namespace Express {
    interface Request {
      user?: User; // Define the type of the user property
    }
  }
}
