import passport from 'passport';
import {
	Strategy as GoogleStrategy,
	StrategyOptions,
} from 'passport-google-oauth20';
import { UserRepository } from '../../domain/interfaces/UserRepository.js';
import { DIContainer } from '../DIContainer.js';
import { User } from '../../domain/entities/User.js';

const userRepository: UserRepository = DIContainer.getUserRepository();

const strategyOptions: StrategyOptions = {
	clientID: process.env.GOOGLE_CLIENT_ID!,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
	callbackURL: '/api/auth/google/callback',
};

passport.use(
	new GoogleStrategy(
		strategyOptions,
		async (
			accessToken: string,
			refreshToken: string,
			profile: any,
			done: (error: any, user?: any) => void
		) => {
			try {
				// Hitta användare med Google ID
				let user = await userRepository.findByGoogleId(profile.id);

				// Om användare inte finns, skapa ny användare
				if (!user) {
					user = await userRepository.create(
						new User(
							'', // ID sätts av databasen
							profile.id, // googleId
							profile.displayName, // name
							profile.emails?.[0]?.value, // email
							new Date() // createdAt
						)
					);
				}

				// Skicka användaren vidare
				done(null, user);
			} catch (error) {
				// Vid fel, skicka vidare felet
				done(error, null);
			}
		}
	)
);

// Serialisera användaren för sessioner
passport.serializeUser((user: any, done) => {
	done(null, user.googleId); // Serialisera Google ID
});

// Deserialisera användaren från sessioner
passport.deserializeUser(async (googleId: string, done) => {
	try {
		const user = await userRepository.findByGoogleId(googleId); // Hämta användare med Google ID
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

export default passport;
