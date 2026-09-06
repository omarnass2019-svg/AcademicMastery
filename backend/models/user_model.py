from datetime import datetime

class User:
    def __init__(self, uid, email, name, country, grade):
        self.uid = uid
        self.email = email
        self.name = name
        self.country = country
        self.grade = grade
        self.created_at = datetime.now().isoformat()
        self.preferences = {}
    
    def to_dict(self):
        return {
            'uid': self.uid,
            'email': self.email,
            'name': self.name,
            'country': self.country,
            'grade': self.grade,
            'created_at': self.created_at,
            'preferences': self.preferences
        }