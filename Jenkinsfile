node {
    stage('Checkout') {
        git url: 'https://github.com/ahmed22362/jinkens_deploy.git', branch: 'main'
    }

    stage('Build') {
        echo "build in progress"
    }
    stage("test"){
        sh 'echo "this is in test stage"'
    }
}