#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    gitlabCommitStatus('build') {
        docker.image('openjdk:8').inside('-e HOME="./" -e PREFIX="./" -e MAVEN_OPTS="-Duser.home=./"') {

            stage('check java') {
                sh "java -version"
            }

            stage('clean') {
                sh "chmod +x mvnw"
                sh "./mvnw clean"
                def pom = readMavenPom file: 'pom.xml'
                print pom.version
                env.version = pom.version
            }

            stage('install tools') {
                configFileProvider([configFile(fileId: 'my-maven-settings', variable: 'MAVEN_SETTINGS')]) {
                    sh "./mvnw -s $MAVEN_SETTINGS com.github.eirslett:frontend-maven-plugin:install-node-and-yarn -DnodeVersion=v8.9.1 -DyarnVersion=v1.3.2"
                }

            }

            stage('yarn install') {
                configFileProvider([configFile(fileId: 'my-maven-settings', variable: 'MAVEN_SETTINGS')]) {
                    sh "./mvnw -s $MAVEN_SETTINGS com.github.eirslett:frontend-maven-plugin:yarn"
                }
            }


            stage('package and deploy') {
                configFileProvider([configFile(fileId: 'my-maven-settings', variable: 'MAVEN_SETTINGS')]) {
                    sh "./mvnw -s $MAVEN_SETTINGS deploy -Pprod -DskipTests"
                    archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
                }

            }

        }

        def dockerImage
        stage('build docker') {
            sh " cp -R src/main/docker target/"
            sh " cp target/*.war target/docker/"
            dockerImage = docker.build('samtagateway', 'target/docker')
        }

        stage('publish docker') {
            docker.withRegistry('https://172.17.66.13', 'docker-login') {
                dockerImage.push 'latest'
                dockerImage.push env.version
            }
        }
    }

}
