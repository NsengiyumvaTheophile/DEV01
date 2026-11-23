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
        echo 'Building Docker image...'
        bat 'docker build -t devops-app:1.0 .'
    }
}