
pipeline {
    agent any

    environment {
        PATH+DOCKER = 'C:\\Users\\user\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
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
                bat 'where docker'
                bat 'docker --version'

                echo 'Checking Docker engine...'
                bat 'docker info'

                echo 'Building Docker image...'
                bat 'docker build -t devops-app:1.0 .'

                echo 'Docker image built successfully!'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: All pipeline stages completed!'
        }

        failure {
            echo 'FAILURE: Check Jenkins Console Output.'
        }

        always {
            echo 'Jenkins pipeline execution finished.'
        }
    }
}
