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
                sh 'docker --version'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Task Tracker Docker image...'
                sh 'docker build -t task-tracker:latest ./app'
            }
        }

        stage('Verify Image') {
            steps {
                echo 'Verifying Docker image...'
                sh 'docker images task-tracker'
            }
        }
    }
}