
pipeline {
    agent any

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

        stage('SAST Security Scan') {
            steps {
                echo 'Scanning source code for security vulnerabilities...'

                bat '''
                    set "PATH=C:\\Users\\user\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin;%PATH%"

                    echo Checking Docker...
                    docker --version
                    docker info

                    echo Running Semgrep SAST scan...
                    docker run --rm -v "%WORKSPACE%:/src" semgrep/semgrep semgrep scan --config p/security-audit --error /src
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'

                bat '''
                    set "PATH=C:\\Users\\user\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin;%PATH%"

                    echo Checking Docker installation...
                    where docker

                    echo Checking Docker version...
                    docker --version

                    echo Checking Docker engine...
                    docker info

                    echo Building Docker image...
                    docker build -t devops-app:1.0 .

                    echo Docker image built successfully!
                '''
            }
        }

        stage('Pipeline Summary') {
            steps {
                echo 'Unit tests, integration tests, SAST and Docker build completed successfully!'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: All tests, security scans and Docker build passed!'
        }

        failure {
            echo 'FAILURE: Check Jenkins Console Output.'
        }

        always {
            echo 'Jenkins pipeline execution finished.'
        }
    }
}
