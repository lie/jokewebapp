function virticalWriting(arg) {
	const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
	var x = new Array;
	var y = new Array;
	arg.split("\n").forEach(function(val, index, ar) {
		x.push(val.split(""));
	});
	x = transpose(x);
	x.forEach(function(val, index, ar) {
		y.push(val.join(""));
	})
	var ret = y.join("<br>");
	//console.log(y);
	//console.log(ret);

	var elem = document.getElementById("output");
	elem.innerHTML = converseToVirticalWriting(arg).replace(/\n/g, "<br>");

	var tweetbutton = document.getElementById("tweetbutton");
}

function converseToVirticalWriting(arg) {
	var str = arg;
	var ret = "";
	var strArray = [[]];
	var retArray = [[]];

	/* 
	 *  ASCII 文字、半角スペースを全角に変換
	 *  半角カタカナは一旦無視
	 */
	str = str.replace(/[\x21-\x7E]/g, function(s) {
		return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
	}).replace(/ /g, "　");

	/*
	 *  strList = str.split("\n");
	 *  全角スペースを挿入して長さを揃える
	 */
	var strList = str.split("\n");
	var maxLength = 0;
	strList.forEach(function(val, index, ar) {
		if(val.length > maxLength) {
			maxLength = val.length;
		}
	});
	strList.forEach(function(val, index, ar) {
		ar[index] += "　".repeat(maxLength - val.length);
	});

	/*
	 *  strArray: 2次元配列
	 */
	strList.forEach(function(val, index, ar) {
		strArray[index] = val.split("");
	});

	/*
	 *  retArray: strArray を転置
	 */
	for(var i = 0; i < maxLength; i++) {
		for(var j = 0; j < strList.length; j++) {
			console.log(i, j);
			ret += strList[strList.length - j - 1].substr(i, 1);
			if(j != strList.length - 1) {
				ret += "　";
			}
			console.log(ret);
		}
		ret += "\n";
	}

	/*
	 *  各行の末尾の全角スペースを削除
	 */
	var retList = ret.split("\n");
	retList.forEach(function(val, index, ar) {
		ar[index] = val.replace(/　*$/g, "");
	});
	ret = retList.join("\n");

	return ret;

	console.log("ret = " + ret);
	console.log(ret);

	retArray.length = maxLength;
	retArray.forEach(function(val, index, ar) {
		ar[index] = new Array;
		ar[index].length = strList.length;
	});

	console.log(retArray);

	for(var i = 0; i < strList.length; ++i) {
		for(var j = 0; j < maxLength; ++j) {
			console.log("strArray = " + strArray);
			retArray[j][i] = strArray[i][j];
		}
	}

	console.log(strArray);

	/*
	var argStrArray = new Array;
	var maxCol = 0;
	str.split("\n").forEach(function(val, index, ar) {
		retArgSplit.push(val.split(""));
		if(val.split("").length > maxCol) {
			maxCol = val.split("").length;
		}
	});

	var retStrArray = new Array;

	var ret = str;

	return ret;
	*/
}

function tweet() {
	var haiku = converseToVirticalWriting(document.getElementById("input").value).replace(/\n/g, "%0a");
	var url = location.href;
	location.href = "https://twitter.com/intent/tweet?text=" + haiku + "&url=" + url;
}
