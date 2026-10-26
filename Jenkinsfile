pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/pratik-zende88/myapp-devops.git'
            }
        }

        stage('Build Info') {
            steps {
                echo 'Task Tracker application code downloaded successfully!'
                sh 'ls -la'
                sh 'node --version || true'
            }
        }
    }
}