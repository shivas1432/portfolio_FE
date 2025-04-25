import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Reference.css';

const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close-btn" onClick={onClose}>&times;</span>
        <img src={imageUrl} alt="Letter of Recommendation" className="modal-image-display" />
      </div>
    </div>
  );
};

const Reference = () => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoR, setSelectedLoR] = useState(null);

  const fetchReferences = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8081/api/references');
      
      if (!res.ok) {
        throw new Error('Failed to fetch references');
      }
      
      const data = await res.json();
      setReferences(data);
    } catch (error) {
      console.error('Error fetching references:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  const handleViewLoR = (lorPath) => {
    setSelectedLoR(`http://localhost:8081/${lorPath}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoR(null);
  };

  // Calculate loading placeholder items
  const LoadingPlaceholders = () => {
    return Array(4).fill().map((_, index) => (
      <div key={`loading-${index}`} className="reference-item">
        <div className="reference-content">
          <div className="reference-image" style={{ background: 'var(--input-bg)' }}></div>
          <div className="reference-info">
            <div style={{ height: '28px', width: '70%', background: 'var(--input-bg)', borderRadius: '4px', marginBottom: '12px' }}></div>
            <div style={{ height: '16px', width: '60%', background: 'var(--input-bg)', borderRadius: '4px', marginBottom: '8px' }}></div>
            <div style={{ height: '16px', width: '80%', background: 'var(--input-bg)', borderRadius: '4px', marginBottom: '8px' }}></div>
            <div style={{ height: '16px', width: '50%', background: 'var(--input-bg)', borderRadius: '4px', marginBottom: '8px' }}></div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="reference">
      <h1>References</h1>
      
      {loading ? (
        <div className="reference-list">
          <LoadingPlaceholders />
        </div>
      ) : error ? (
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchReferences} className="retry-button">Retry</button>
        </div>
      ) : (
        <div className="reference-list">
          {references.length > 0 ? (
            references.map((ref) => (
              <div key={ref.id} className="reference-item">
                <div className="reference-content">
                  <img 
                    src={`http://localhost:8081/${ref.image_path || 'noimage.png'}`} 
                    alt={`${ref.name}`} 
                    className="reference-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x180?text=No+Image';
                    }}
                  />
                  <div className="reference-info">
                    <h3>{ref.name}</h3>
                    <p><strong>Email:</strong> {ref.email}</p>
                    <p><strong>Job Title:</strong> {ref.job_title}</p>
                    <p><strong>Company:</strong> {ref.company}</p>
                    <p><strong>Relationship:</strong> {ref.relationship}</p>
                    
                    {ref.about_me && (
                      <p><strong>About:</strong> {ref.about_me.length > 100 
                        ? `${ref.about_me.substring(0, 100)}...` 
                        : ref.about_me}
                      </p>
                    )}
                    
                    {ref.signature_path && (
                      <div className="reference-signature">
                        <p><strong>Signature:</strong></p>
                        <img 
                          src={`http://localhost:8081/${ref.signature_path}`} 
                          alt="Signature" 
                          className="signature-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="reference-actions">
                      {ref.lor_path ? (
                        <button 
                          onClick={() => handleViewLoR(ref.lor_path)} 
                          className="view-lor-button"
                        >
                          View Letter
                        </button>
                      ) : (
                        <span className="no-lor">No Letter Available</span>
                      )}
                      
                      <Link 
                        to={`/edit-reference/${ref.id}`} 
                        className="edit-reference-button"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-references">
              <p>No references found.</p>
              <p>Click the + button to add your first reference.</p>
            </div>
          )}
        </div>
      )}
      
      <Link to="/add-references" className="add-reference-button" title="Add new reference">+</Link>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        imageUrl={selectedLoR} 
      />
    </div>
  );
};

export default Reference;