// Download page functionality

document.addEventListener('DOMContentLoaded', function() {
    const joinForm = document.getElementById('join-form');
    if (joinForm) {
        initDownloadPage();
    }
});

function initDownloadPage() {
    document.getElementById('join-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const country = document.getElementById('country').value;
        
        // Show success message
        document.getElementById('beta-form').innerHTML = `
            <div class="text-center py-8">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-3xl text-green-600"></i>
                </div>
                <h3 class="font-bold text-2xl text-gray-800">Welcome to FitPesa Beta!</h3>
                <p class="text-gray-600 mt-3 max-w-md mx-auto">
                    Thanks, ${name}! We've sent the APK download link to <strong>${email}</strong>. 
                    Your 1000 FITP welcome bonus will be credited when you complete registration.
                </p>
                <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="https://www.dropbox.com/s/replace-with-your-apk/FitPesa-Beta.apk?dl=1" 
                       target="_blank" 
                       class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                        <i class="fab fa-android"></i>
                        Download APK Now
                    </a>
                    <a href="index.html" class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                        <i class="fas fa-home"></i>
                        Back to Home
                    </a>
                </div>
                <div class="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-left">
                    <h4 class="font-semibold text-blue-900 mb-2">Next Steps:</h4>
                    <ol class="list-decimal ml-5 text-blue-800 space-y-1">
                        <li>Download and install the APK on your Android device</li>
                        <li>Enable "Install from Unknown Sources" if prompted</li>
                        <li>Create your account with the same email (${email})</li>
                        <li>Complete your profile and start walking to earn FITP!</li>
                    </ol>
                </div>
            </div>
        `;
        
        // Simulate API call
        console.log('Beta signup:', { name, email, country });
    });
}
