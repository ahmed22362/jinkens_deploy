node {
    stage('Checkout') {
        git url: 'https://github.com/ahmed22362/jinkens_deploy.git', branch: 'main'
    }

    stage('Build') {
        sh 'npm i'
    }
    stage("run"){
        sh 'echo "this is in run stage"'
        sh 'node node_app/server.js'
    }
}