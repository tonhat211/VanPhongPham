import React, { useState } from 'react';

const ImageUpload = ({ onImageChange }) => {
    const [preview, setPreview] = useState(null);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
  
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
  
        // Truyền file ra ngoài nếu cần xử lý (upload lên server)
        onImageChange && onImageChange(file);
      }
    };
  
    return (
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <div style={{ marginTop: '10px' }}>
            <img src={preview} alt="Preview" width="200px" />
          </div>
        )}
      </div>
    );
  };
  

export default ImageUpload;