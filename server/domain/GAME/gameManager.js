import { gameBoard } from "./gameBoard.js";
import {getDatabase} from "firebase-admin/database";

export class gameManager{
    //coupledCards = [] // 짝 맞춰진 카드 id
    cardsState = [] // 0: 짝이 안맞춰짐, 1: 짝이 맞춰짐
    
    pick = 0 //현재 턴을 가진 team에서 뽑은 카드 위치, 2개가 뽑히면 짝이 맞는지 안맞는지 판별 후 리턴
    teamTurn = 0 // 현재 턴을 가진 team num
    userTurn = 0 // 현재 턴을 가진 team 중 턴을 가진 팀원 순서
    teamscore = [] //팀별 점수
    teams = []; //게임 시작후 확정된 team
    maxTeam;
    round = 1;
    combo = 1;

    constructor(maxTeam){
        maxTeam = maxTeam;
        this.gameBoard = new gameBoard();

        //for(let i=0;i<maxTeam;i++)
        //   this.teamscore.push(0);

        for(let i=0;i<this.gameBoard.row;i++){
            let a=[];
            for(let j=0;j<this.gameBoard.col;j++){
                a.push(0);
            }
            this.cardsState.push(a);
        }
    }

    getUserTurn(gameManagerRef) {
        return new Promise((resolve, reject) => {
            gameManagerRef.on('value', snapshot => {
                let userTurn = snapshot.val()["userTurn"];
                resolve(userTurn);
            })
        })
    }

    getTeamTurn(gameManagerRef) {
        return new Promise((resolve, reject) => {
            gameManagerRef.on('value', snapshot => {
                let teamTurn = snapshot.val()["teamTurn"];
                resolve(teamTurn);
            })
        })
    }

    setCombo(gameManagerRef, num) {
        return new Promise((resolve, reject) => {
            gameManagerRef.child(`${combo}`).set(num);
        })
    }
}