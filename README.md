📰 Personalized Feed App
A mobile app built using React Native (Expo) and Supabase.
Users can register, log in, follow others, post content, and see a personalized feed.

✨ Features
Register & login (custom username/password)

Add posts with title, description, and tags

Global Feed – shows all posts

Personalized Feed – shows followed users' posts

Follow/Unfollow users from posts

Clean mobile UI

🔧 Tech Used
React Native (Expo) – Frontend

Supabase – Backend (Database + API)

EAS Build – For generating .apk file

🏗️ Folder Structure
pgsql
Copy
Edit
MY-APP/
├── App.js
├── app.json
├── supabase.js
├── services.js
├── LoginScreen.js
├── AddPostScreen.js
├── GlobalFeedScreen.js
├── PersonalizedFeedScreen.js
├── FeedScreen.js
├── components/PostCard.js
├── assets/
├── package.json
🔐 Supabase Tables
users – id, username, password

posts – id, user_id, title, description, tags, created_at

follows – follower_id, following_id

▶️ How to Run
Install dependencies
npm install

Start the app
npx expo start

Scan QR code using Expo Go app on your phone

📱 Build APK
bash
Copy
Edit
eas build --platform android --profile preview
Result: You’ll get a .apk link to download and install on Android.

✨ Credits
Made by Mathan L
📧 Contact Me : mathanl1434@gmail.com
.
