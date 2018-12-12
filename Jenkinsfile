#!/usr/bin/env groovy

def branch = BRANCH_NAME.toLowerCase().replace('/', '.')
final boolean isPullRequest = !!env.CHANGE_TARGET
String buildCommitHash

echo "branch : $branch"
echo "isPullRequest : $isPullRequest"

stage('Build') {
    milestone()
    lock("${branch} Workspace") {
        node('tool:docker') {
            cleanWs()
            buildCommitHash = checkout(scm).GIT_COMMIT
            echo "buildCommitHash : $buildCommitHash"
        }
    }
}