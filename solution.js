function almostSorted(arr) {
    /* Very strength forward, find out how many disorder first and see if it can be fixed by applying swap or reverse once.*/
    var currentNum, nextNum;
    var disorderArr = new Array();
    
    for(var i=0; i<arr.length-1; i++){
        currentNum = arr[i];
        nextNum = arr[i+1];
        
        if(nextNum < currentNum){
            disorderArr.push(i);
        }
    }
    
    var result, msg;
    
    validate: if(disorderArr.length == 0){
        result='yes';   // No disorder.
    }else if(disorderArr.length == 1){
        //swap case only as only 1 disorder
        if(disorderArr[0]==arr.length-2){   //Edge case
            result='yes';
            msg = 'swap '+ String(arr.length-1) + ' ' + arr.length;
        }else{
            if(arr[disorderArr[0]]<arr[disorderArr[0]+2] && arr[disorderArr[0]+1]> arr[disorderArr[0]-1]){  //check oreding after swap. Make sure the order is correct bewteen arr[i-1] and arr[i+2].
                result='yes';
                msg = 'swap '+ String(disorderArr[0]+1) + ' ' + String(disorderArr[0]+2); //adding 1 to the index as the result required index start from 1 instead of zero.
            }
        }
    }else if(disorderArr.length == 2){
        //If it cane be fixed by reverse, it could be fixed by swap in this case.
        //Hence, check for swap case only as swap is the prefer method if it can be fixed by either swap and reverse.
        
        //check oreding after swap. Make sure the order is correct bewteen the next and the pervious numbers of the swap pairs.
        if(arr[disorderArr[0]] > arr[disorderArr[1]] && arr[disorderArr[0]] < arr[disorderArr[1]+2] 
            && arr[disorderArr[1]+1]<arr[disorderArr[0]+1] && arr[disorderArr[1]+1]>arr[disorderArr[0]-1]){
                result='yes';
                msg = 'swap '+ String(disorderArr[0]+1) + ' ' + String(disorderArr[1]+2);
        }
    }else{
        //This is for disordering more than 2 times. It only can be solved by reverse when the disordering is in squence.
        for(var j=1; j< disorderArr.length; j++){
            if(disorderArr[j] != disorderArr[0]+j){
                //The disordering is not in squence. No need to check further and return result as no. 
                break validate;
            }
        }
        
        //Check after reverse to see if it is in order between arr[i-1] and arr[j+2]. j is the lastest recorred disorder index.
        if(arr[disorderArr[0]] < arr[disorderArr[disorderArr.length-1]+2] && arr[disorderArr[disorderArr.length-1]+1] > arr[disorderArr[0]-1]){
            result='yes';
            msg = 'reverse '+ String(disorderArr[0]+1) + ' ' + String(disorderArr[disorderArr.length-1]+2);
        }
        
    }
