# firstexpress

test:
fetch('http://localhost:3000/person/6', {
method: 'DELETE',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({firs_name: 'Jack', last_name: 'London', email: 'jl@gmai.com'})
                     }).then(r => r.json() )
.then(d => console.log(d) );
