let fields = ['name','phone','email','address','objective','education','experience','languages'];

fields.forEach(id=>{
   let input = document.getElementById(id);
   let preview = document.getElementById('preview-'+id);

   input.addEventListener('input', ()=>{
      preview.innerText = input.value;
   });
});

let photoInput = document.getElementById('photo');
let photoDiv = document.getElementById('preview-photo');

photoInput.addEventListener('change', e=>{
   let file = e.target.files[0];
   if(file){
      let reader = new FileReader();
      reader.onload = ()=>{
         photoDiv.style.background = `url(${reader.result}) center/cover`;
         photoDiv.innerText = "";
      }
      reader.readAsDataURL(file);
   }
});

function setupList(inputId, btnId, listId, previewId){
   let input = document.getElementById(inputId);
   let btn = document.getElementById(btnId);
   let list = document.getElementById(listId);
   let preview = document.getElementById(previewId);

   btn.addEventListener('click', ()=>{
      if(input.value.trim()==="" || list.children.length>=5) return;

      let li = document.createElement('li');
      li.textContent = input.value;
      list.appendChild(li);

      let li2 = document.createElement('li');
      li2.textContent = input.value;
      preview.appendChild(li2);

      input.value="";
   });
}

setupList('skill-input','add-skill','skill-list','preview-skills');
setupList('project-input','add-project','project-list','preview-projects');

document.getElementById('downloadPdf').addEventListener('click', ()=>{
   let resume = document.getElementById('resume');

   html2pdf().set({
      filename: 'Resume.pdf',
      jsPDF:{unit:'in',format:'a4',orientation:'portrait'}
   }).from(resume).save();
});