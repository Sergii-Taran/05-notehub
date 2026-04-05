# 📝 NoteHub

A modern React application for creating, searching, and managing notes.  
Built with TypeScript, React Query, and a clean component-based architecture.

---

## 🚀 Features

- ✅ Create notes with title, content, and tag
- 🔍 Search notes with debounced input
- 📄 Pagination support
- ❌ Delete notes with instant UI update
- ⏳ Loading indicators
- ⚠️ Error & empty state handling
- 🪟 Modal with ESC close and scroll lock
- 🔔 Toast notifications

---

## 🧱 Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **TanStack Query (React Query)**
- **Formik + Yup**
- **Axios**
- **React Hot Toast**
- **CSS Modules**

---

## 📁 Project Structure

src/
├── components/
│ ├── App/
│ ├── NoteList/
│ ├── NoteForm/
│ ├── Pagination/
│ ├── SearchBox/
│ ├── Modal/
│ ├── Loader/
│ └── StatusMessage/
├── services/
│ └── noteService.ts
├── types/
│ └── note.ts
├── assets/
└── main.tsx

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/notehub.git
cd notehub
Install dependencies:
npm install
Create .env file:
VITE_NOTEHUB_TOKEN=your_api_token
Run the project:
npm run dev
🌐 API

The app uses the public API:

https://notehub-public.goit.study/api

Endpoints used:

GET /notes — fetch notes
POST /notes — create note
DELETE /notes/:id — delete note
🧠 Key Implementation Details
🔍 Debounced Search

Search requests are optimized using useDebouncedCallback to prevent excessive API calls.

⚡ Server State Management

Handled via TanStack Query:

caching
background refetching
request deduplication
🧾 Form Handling
Managed with Formik
Validation with Yup
🔄 Data Synchronization

After mutations:

queryClient.invalidateQueries({ queryKey: ['notes'] });

🎯 Tags

Each note must include one of the following tags:

Todo
Work
Personal
Meeting
Shopping
🖼 UI/UX Highlights
Centered loader
Disabled buttons during async actions
Inline validation errors
Smooth pagination
Modal with:
ESC close
backdrop click close
scroll lock
📌 Future Improvements
✏️ Edit (update note)
🗂 Filter by tag
🌙 Dark mode
📱 Mobile optimization

👨‍💻 Author

Sergii Taran

📄 License

This project is for educational purposes.
```
