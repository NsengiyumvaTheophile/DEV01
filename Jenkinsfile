
pipeline {
    agent any

    stages {

        // Stage 1: Install Dependencies
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'node --version'
                bat 'npm.cmd --version'
                bat 'npm.cmd install'
            }
        }

        // Stage 2: Unit Testing
        stage('Unit Testing') {
            steps {
                echo 'Running unit tests...'
                bat 'npm.cmd run test:unit'
            }
        }

        // Stage 3: Integration Testing
        stage('Integration Testing') {
            steps {
                echo 'Running integration tests...'
                bat 'npm.cmd run test:integration'
            }
        }

        // Stage 4: SAST Security Scan - Activity 15
        stage('SAST Security Scan') {
            steps {
                echo 'Scanning source code for security vulnerabilities using Semgrep...'

                bat '''
                    set "PATH=C:\\Users\\user\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin;%PATH%"

                    echo Checking Docker installation...
                    docker --version

                    echo Checking Docker engine...
                    docker info

                    echo Running Semgrep SAST security scan...
                    docker run --rm -v "%WORKSPACE%:/src" semgrep/semgrep semgrep scan --config p/security-audit --error /src

                    echo Semgrep security scan completed successfully!
                '''
            }
        }

        // Stage 5: Build Docker Image
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

        // Stage 6: Pipeline Summary
        stage('Pipeline Summary') {
            steps {
                echo 'Unit tests, integration tests, SAST security scan and Docker build completed successfully!'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: All tests, security scans and Docker build passed!'
        }

        failure {
            echo 'FAILURE: Tests, security scanning or Docker build detected a problem!'
        }

        always {
            echo 'Jenkins pipeline execution finished.'
        }
    }
}
