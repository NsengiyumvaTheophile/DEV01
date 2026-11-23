
pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Installing testing dependencies...'
                bat 'node --version'
                bat 'npm.cmd --version'
                bat 'npm.cmd install'
            }
        }

        stage('Unit Testing') {
            steps {
                echo 'Running unit tests...'
                bat 'npm.cmd run test:unit'
            }
        }

        stage('Integration Testing') {
            steps {
                echo 'Running integration tests...'
                bat 'npm.cmd run test:integration'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Checking Docker installation...'
                bat 'docker --version'

                echo 'Building Docker image...'
                bat 'docker build -t devops-app:1.0 .'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Jenkins pipeline completed successfully!'
            echo 'Docker image devops-app:1.0 was built.'
        }

        failure {
            echo 'FAILURE: Check Jenkins Console Output.'
        }

        always {
            echo 'Jenkins pipeline execution finished.'
        }
    }
}
