
let chatBoxA = document.querySelector('#chatMain');
let chatBoxB = document.querySelector('#chatSub');
let chatBody = document.querySelector('#chatBody');

let introBox = document.querySelector('#intro');
let videoBox = document.querySelector('#video');
let videoBox2 = document.querySelector('#video2');

let cmd = document.querySelector('#cmd');
let cmdFront = document.querySelector('#cmdFront');
let cmdClose = document.querySelector('#cmdEnd');
let cmdBody = document.querySelector('#cmdBody');

let cmdVisible = false;

let cmdText;

let chatFocus = 1; // 채팅창 포커스. 1번은 메인 채팅, 2번은 서브 채팅.

let scentId = 0; // 0. video, 1. intro, 2. chat mode

let basicIdA = '섬';
let basicIdB = '썸원';

let tempPTag;

//cmd 이동을 위한 변수설정
let nowCmdX, nowCmdY;
let nowPosX, nowPosY;
let isDragging = null;

// chatBody 스크롤 위치 최하단 변경위한 변수
let isChatBodySCBtm = true;
// cmdBody 스크롤 위치 항상 옮기기 
let isCmdBodySCBtm = true;
// 서브 채팅 텍스트 애니메이션 나오기
let isAniText = true;
let aniTime = 500; // 텍스트 애니메이션 속도 ms

// 이벤트 
document.addEventListener('keydown', keyFn);
cmdClose.addEventListener('click', cmdOpen);
cmdFront.addEventListener('mousedown', cmdMouseDown);
document.addEventListener('mousemove', cmdDragged);
document.addEventListener('mouseup', cmdMouseUp);
chatBody.addEventListener('scroll', chatScroll);
function keyFn(e)
{
    if (scentId == 0)
    {
        //console.log(e.key);
        if(e.key == "s" || e.key == "S" || e.key == "ㄴ")
        {
            closeVideo();
        }

    }
    else if (scentId == 1)
    {
        //console.log(e.key);
        if(e.key == "s" || e.key == "S" || e.key == "ㄴ")
        {
            startChat();
        }

    }
    else
    {
        //console.log(e.key);
        if(e.key == "Control")
        {
            changeFocus();
        }
        else if(e.key == "Enter")
        {
            makeChat(1); // 정상 채팅 모드
        }
        else if(e.key == "Home")
        {
            cmdOpen();
        }
        else if(e.key =='Insert')
        {
            makeChat(2); // 히든 채팅 모드
        }
        else if(e.key =='Delete')
        {
            deleteSt();
        }
        else if(e.key == 'End')
        {
            videoBox2.classList.toggle('active');
        }

    }

}

function cmdMouseDown(e)
{
    isDragging = true;
    nowCmdX = cmd.offsetLeft;
    nowCmdY = cmd.offsetTop;
    nowPosX = e.clientX;
    nowPosY = e.clientY;
}

function cmdDragged(e)
{
    if(isDragging)
    {
        let valX = e.clientX - nowPosX;
        let valY = e.clientY - nowPosY;
        cmd.style.left = nowCmdX + valX + 'px';
        cmd.style.top = nowCmdY+ valY + 'px';
    }
}

function cmdMouseUp()
{
    isDragging = false;
}

let startInterval;

function cmdOpen()
{
    if(!cmdVisible)
    {
        cmd.style.visibility = "visible";
        cmdVisible = true;
    }
    else
    {
        cmd.style.visibility = "hidden";
        cmdVisible = false;
    }
}

function startChat()
{
    startInterval = setInterval(closeIntro, 1000);
}

function closeIntro()
{
    //console.log("close intro");
    clearInterval(startInterval);
    introBox.style.display = 'none';
    scentId = 2;
    changeFocus();
    cmd.style.visibility = "hidden";
}

function closeVideo()
{
    //console.log("close intro");
    clearInterval(startInterval);
    videoBox.style.display = 'none';
    scentId = 1;
}

function changeFocus()
{
    if(chatFocus == 1)
    {
        chatBoxB.focus();
        chatFocus = 2;
    }
    else{
        chatBoxA.focus();
        chatFocus = 1;
    }
}

function makeChat(mode)
{
    let tempChat;
    let tempID;
    if(chatFocus == 1)
    {
        tempChat = chatBoxA.value;
        tempID = basicIdA;
    }
    else{
        tempChat = chatBoxB.value;
        tempID = basicIdB;
    }
    
    if(tempChat != "" || tempChat != undefined)
    {
        if(mode == 1)
        {
            tempPTag = document.createElement('p');
            tempPTag.classList.add('chat');
            if(chatFocus == 1)
            {
                tempPTag.classList.add('chatBodyText');
                //tempPTag.style.color = '#fff';
                tempPTag.innerHTML = '[' + tempID+ ']\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0' + tempChat;
            }
            else
            {
                tempPTag.classList.add('chatBodyTextB');
                //tempPTag.style.color = '#fff';
                if(isAniText)
                {
                    let tempTextArr = tempChat.split(" ");
                    let nowText ="";
                    let tempIndex = 0;
                    //console.log(tempTextArr);
                    let myInterval = setInterval(makeTextAni, aniTime);
                    function makeTextAni()
                    {
                        if(tempIndex < tempTextArr.length)
                        {
                            if(tempIndex ==tempTextArr.length-1 )
                            {
                                nowText += tempTextArr[tempIndex];
                            }
                            else
                            {
                                nowText += tempTextArr[tempIndex] +'\u00a0';
                            }
                            
                            tempPTag.innerHTML = '[' + tempID+ ']\u00a0\u00a0\u00a0\u00a0\u00a0' + nowText;
                            tempIndex++;
                            if(isChatBodySCBtm)
                            {
                                chatBody.scrollTop = chatBody.scrollHeight;
                            }
                        }
                        else
                        {
                            
                            clearInterval(myInterval);
                        }
                        
                    }
                    
                }
                else
                {
                    tempPTag.innerHTML = '[' + tempID+ ']\u00a0\u00a0\u00a0\u00a0\u00a0' + tempChat;
                }
            }

            
            
            chatBody.appendChild(tempPTag);
            chatBoxA.value = '';
            chatBoxB.value = '';

            if(isChatBodySCBtm && chatFocus == 1)
            {
                chatBody.scrollTop = chatBody.scrollHeight;
            }

            cmdBody.innerHTML += '<span class="cmdChat" style="display:block;"><span style ="color:white; margin: 10px 0px;">'+'2020-12-27,\u00a0' + '"'+ tempID + '","' +tempChat+ '"' + '</span></span>';
        }
        else if(mode == 2) // 히든 메세지.
        {
            cmdBody.innerHTML += '<span class="cmdChat red" style="display:block;"><span style ="color:white; margin: 10px 0px;">'+'2020-12-27,\u00a0' +
            '</span><span style ="color:red;">'+ '"'+ tempID + '", [DELETED] "' +tempChat+ '"' + '</span></span>';
        }

        if(isCmdBodySCBtm)
        {
            cmdBody.scrollTop = cmdBody.scrollHeight;
        }

        
    }else
    {
        return;
    }
}

function deleteSt()
{
    let deleteChat = document.querySelectorAll('.chat');
    let deleteCmdChat = document.querySelectorAll('.cmdChat');

    if(deleteChat.length != 0)
    {
        chatBody.removeChild(deleteChat[deleteChat.length-1]);
        cmdBody.removeChild(deleteCmdChat[deleteCmdChat.length-1]);
        console.log(deleteCmdChat[deleteCmdChat.length-1].className);
        if(deleteCmdChat.length != 1 && deleteCmdChat[deleteCmdChat.length-2].className == 'cmdChat red' )
        {
            cmdBody.removeChild(deleteCmdChat[deleteCmdChat.length-2]);
        }
    }
}

function chatScroll(e)
{
    if(e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight)
    {
        isChatBodySCBtm = true;
    }
    else{
        isChatBodySCBtm = false;
    }
}

function init()
{
    changeFocus();
}

//init();