import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

function HomePage({ user }) {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/countries/all');
      setCountries(response.data.countries);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="welcome-section">
          <h1>🎓 مرحباً بك في AcademicMastery</h1>
          <p>منصة تعليمية احترافية لتحقيق أعلى العلامات في الامتحانات</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>معلم ذكي</h3>
            <p>الذكاء الاصطناعي يشرح لك مثل المعلم في الفصل</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>مواد شاملة</h3>
            <p>كل مواد منهاجك بالتفصيل والشرح الوافي</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>ملاحظاتك الشخصية</h3>
            <p>احفظ ملاحظاتك وتابعها أي وقت</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✏️</div>
            <h3>امتحانات تفاعلية</h3>
            <p>اختبر نفسك وتتبع تقدمك</p>
          </div>
        </div>

        <div className="countries-section">
          <h2>اختر دولتك للبدء</h2>
          {loading ? (
            <p>جاري التحميل...</p>
          ) : (
            <div className="countries-grid">
              {countries.slice(0, 6).map((country) => (
                <div
                  key={country.id}
                  className="country-card"
                  onClick={() => navigate(`/subjects/${country.id}`)}
                >
                  <div className="country-flag">{country.flag}</div>
                  <h3>{country.name}</h3>
                  <p>{country.name_en}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="stats-section">
          <div className="stat-box">
            <h4>6+ دول</h4>
            <p>مناهج مختلفة</p>
          </div>
          <div className="stat-box">
            <h4>100+</h4>
            <p>مادة دراسية</p>
          </div>
          <div className="stat-box">
            <h4>1000+</h4>
            <p>شروح وفيديوهات</p>
          </div>
          <div className="stat-box">
            <h4>AI</h4>
            <p>معلم ذكي 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;