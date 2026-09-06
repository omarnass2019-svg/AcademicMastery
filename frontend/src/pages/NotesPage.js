import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotesPage.css';

function NotesPage({ user }) {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/notes/user/${user.email}`);
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/notes/create', {
        user_id: user.email,
        subject,
        content
      });
      setSubject('');
      setContent('');
      setShowForm(false);
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="notes-page">
      <div className="container">
        <h1>📝 ملاحظاتي</h1>

        {!showForm ? (
          <button className="btn-add-note" onClick={() => setShowForm(true)}>
            + إضافة ملاحظة جديدة
          </button>
        ) : (
          <form onSubmit={handleAddNote} className="note-form">
            <input
              type="text"
              placeholder="المادة"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea
              placeholder="اكتب ملاحظتك هنا..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="5"
            />
            <div className="form-buttons">
              <button type="submit" className="btn-submit">حفظ</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                إلغاء
              </button>
            </div>
          </form>
        )}

        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <h3>{note.subject}</h3>
              <p>{note.content}</p>
              <small>{new Date(note.created_at).toLocaleDateString('ar')}</small>
              <button
                className="btn-delete"
                onClick={() => handleDeleteNote(note.id)}
              >
                حذف
              </button>
            </div>
          ))}
        </div>

        {notes.length === 0 && !showForm && (
          <p className="empty-message">لا توجد ملاحظات حتى الآن</p>
        )}
      </div>
    </div>
  );
}

export default NotesPage;