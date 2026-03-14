import { useState } from 'react';
import authService from '../services/authService';

const TestCORS = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const testCORS = async () => {
    setLoading(true);
    setTestResult('Testing...');
    
    try {
      // Test 1: Simple GET
      const response1 = await fetch('http://localhost:5000/', {
        method: 'GET',
        mode: 'cors'
      });
      
      // Test 2: OPTIONS preflight
      const response2 = await fetch('http://localhost:5000/api/auth/login', {
        method: 'OPTIONS',
        headers: {
          'Origin': 'http://localhost:5175',
          'Access-Control-Request-Method': 'POST'
        }
      });
      
      // Test 3: Avec authService
      const serviceTest = await authService.testConnection();
      
      const result = `
        ===== TEST CORS RÉSULTATS =====
        
        ✅ Test 1 - GET /:
        Status: ${response1.status}
        Headers: ${JSON.stringify(Object.fromEntries(response1.headers.entries()), null, 2)}
        
        ✅ Test 2 - OPTIONS /api/auth/login:
        Status: ${response2.status}
        Access-Control-Allow-Origin: ${response2.headers.get('access-control-allow-origin')}
        Access-Control-Allow-Methods: ${response2.headers.get('access-control-allow-methods')}
        
        ✅ Test 3 - Service de connexion:
        ${serviceTest.message}
        ${serviceTest.data ? JSON.stringify(serviceTest.data, null, 2) : ''}
        
        ===== CONFIGURATION =====
        Frontend: http://localhost:5175
        Backend: http://localhost:5000
        Heure: ${new Date().toLocaleTimeString()}
      `;
      
      setTestResult(result);
      
    } catch (error) {
      setTestResult(`❌ ERREUR: ${error.message}\n\nStack: ${error.stack}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ 
      padding: '20px', 
      background: '#f8f9fa', 
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h3 style={{ color: '#495057', marginBottom: '15px' }}>🔧 Test de connexion CORS</h3>
      
      <button 
        onClick={testCORS}
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: loading ? '#6c757d' : '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '15px'
        }}
      >
        {loading ? 'Test en cours...' : 'Lancer le test CORS'}
      </button>
      
      {testResult && (
        <pre style={{
          background: '#212529',
          color: '#e9ecef',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '12px',
          maxHeight: '400px'
        }}>
          {testResult}
        </pre>
      )}
      
      <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '10px' }}>
        <strong>Instructions:</strong>
        <ol>
          <li>Assurez-vous que le backend tourne (port 5000)</li>
          <li>Vérifiez la console pour les logs détaillés</li>
          <li>Si erreur CORS, modifiez server/app.js</li>
        </ol>
      </div>
    </div>
  );
};

export default TestCORS;