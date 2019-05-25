var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
var days=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
window.addEventListener("load",function(){

	var t=new Date();
	var isoTimeSpan=document.querySelector("#iso-time");
	isoTimeSpan.innerHTML=t.toISOString();

	datePicker();
	addE();
	delE();

	$('#event-tog').click(function(e){
		$('#cal-col').slideToggle('slow');
	})

	function datePicker(){
		var m=new Date().getMonth();
		var y=new Date().getFullYear();
		var mInput=document.querySelector("#curr-m");
		var prevM=document.querySelector("#prev-m");
		var nextM=document.querySelector("#next-m");
		
		mInput.innerHTML=month[m]+" "+y;
		
		prevM.addEventListener("click",function(e){
			if(m===0){
				m=12;
			}
			m--;
			mInput.innerHTML=month[m]+" "+y;
			$('.m-td').remove();
			$('.m-day').remove();
			createTbl();
			createMonth();
			curr_d();
			addE();
		})

		nextM.addEventListener("click",function(){
			if(m===month.length-1){
				m=-1
			}
			m++;
			mInput.innerHTML=month[m]+" "+y;
			$('.m-td').remove();
			$('.m-day').remove();
			createTbl();
			createMonth();
			curr_d();
			addE();
		})

		function createTbl(){

			var tbl=document.querySelector("#cal-tbl");
			var d=5;
			var w=6;

			for(var x=0;x<=d;x++){
				var tr=document.createElement('tr');
				for(var y=0;y<=w;y++){
					var td=document.createElement('td');
					td.setAttribute('class','m-td');

					//td.append(1);
					tr.appendChild(td);
				}
				tbl.appendChild(tr)
			}
		}

		function createMonth(){

			var y=new Date().getFullYear();
			mTemp=mInput.innerHTML.split(' ')[0];
			mInt=month.indexOf(mTemp);
			var firstD=new Date(y,mInt,1).getDay();
			var totalD=new Date(y,mInt+1,0).getDate();
			var allD=document.querySelectorAll('.m-td')
			
			var x=0;
			while(x<totalD){
				allD[firstD].setAttribute("class",'m-day');
				var e=document.createElement("a");
				e.setAttribute("class","add-e");
				e.style.marginTop="50px";
				e.setAttribute("data-toggle","modal");
				e.setAttribute("data-target","#eventModal");
				var d=String(x+1)
				
				var i=document.createElement('i');
				i.setAttribute('id',d);
				i.setAttribute('class','fas fa-plus-circle');
				e.append(i)
				var span=document.createElement('span');
				span.setAttribute('class','m-num');
				span.append(x+1);
				allD[firstD].append(span);
				allD[firstD].append(e);
				firstD++;
				x++;
			}
		}

		function curr_d(){

			var mDay=document.querySelectorAll(".m-day");
			var cm=document.querySelector("#curr-m").innerHTML;
			var m=new Date().getMonth();
			var d=new Date().getDate();
			m=month[m];
			cm=cm.split(" ")[0];
			
			if(cm===m){
				mDay[d-1].firstChild.style.backgroundColor="#1c2a48";
				mDay[d-1].firstChild.style.border="1px solid white";
			}
		}

		createTbl();
		createMonth();
		curr_d();
		
	}

	function addE(){
		$('.add-e').click(function(e){
			var curr_date=document.querySelector("#curr_date");
			var eventDateField=document.querySelector("#event-date")
			var day=e.target.id;
			var month_c=document.querySelector("#curr-m").innerHTML.split(" ")[0];
			var year=new Date().getFullYear();
			var dayName=new Date(year,month.indexOf(month_c),day).getDay();
			dayName=days[dayName-1];
			var date=dayName+" "+day+" "+month_c+" "+year;

			curr_date.innerHTML=date;
			eventDateField.value=day+" "+month_c
			
		})
	}

	function delE(){
		$(".e-trash").click(function(e){
			e.target.setAttribute("data-toggle","modal");
			e.target.setAttribute("data-target","#delModal");
			var span=e.target.parentElement;
			var td=span.offsetParent;
			var tr=td.parentElement;
			var eTd=tr.firstElementChild;
			var eName=tr.firstElementChild.innerHTML;
			var eSpan=document.querySelector("#del-span");
			var hiddenE=document.querySelector("#hidden-e");
			eSpan.innerHTML=eName;
			hiddenE.value=eName;
			
		})
	}
})