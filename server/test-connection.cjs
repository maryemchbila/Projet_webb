const mongoose = require('mongoose');

async function testConnection() {
    console.log('🔄 Tentative de connexion à MongoDB...');
    
    try {
        // Version SIMPLIFIÉE - sans les options obsolètes
        await mongoose.connect('mongodb://127.0.0.1:27017/globalpath');
        
        console.log('✅ MongoDB connecté avec succès!');
        console.log('📊 Base de données:', mongoose.connection.db.databaseName);
        
        // Test simple
        console.log('✅ Connexion établie avec MongoDB');
        
        await mongoose.connection.close();
        console.log('✅ Connexion fermée proprement');
        
    } catch (error) {
        console.log('❌ Erreur de connexion:', error.message);
    }
}

testConnection();