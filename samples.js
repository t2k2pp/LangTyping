// Code Samples Database
const CodeSamples = {
    english: {
        easy: `The quick brown fox jumps over the lazy dog. This sentence contains every letter.`,
        medium: `In computer science, abstraction is the process of removing physical, spatial, or temporal details to focus attention on higher-level structures.`,
        hard: `Software engineering is the systematic application of engineering approaches to the development of software. It encompasses design patterns, architectural decisions, testing methodologies, and maintenance strategies that ensure code quality and longevity.`
    },

    javascript: {
        easy: `console.log("Hello, World!");
const sum = (a, b) => a + b;`,
        medium: `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const users = data.map(user => ({
    id: user.id,
    name: user.name.toUpperCase()
}));`,
        hard: `class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return () => this.off(event, listener);
    }
    
    emit(event, ...args) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => {
            listener.apply(this, args);
        });
    }
}`
    },

    react: {
        easy: `const App = () => {
    return <h1>Hello React!</h1>;
};`,
        medium: `function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}`,
        hard: `const useAsync = (asyncFunction) => {
    const [state, setState] = useState({
        loading: false,
        data: null,
        error: null
    });
    
    const execute = useCallback(async (...params) => {
        setState({ loading: true, data: null, error: null });
        try {
            const data = await asyncFunction(...params);
            setState({ loading: false, data, error: null });
        } catch (error) {
            setState({ loading: false, data: null, error });
        }
    }, [asyncFunction]);
    
    return { ...state, execute };
};`
    },

    nodejs: {
        easy: `const http = require('http');
http.createServer((req, res) => {
    res.end('Hello World');
}).listen(3000);`,
        medium: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
    res.json({ users: [] });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});`,
        hard: `const fs = require('fs').promises;
const path = require('path');

async function readDirectory(dirPath) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const files = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                return readDirectory(fullPath);
            }
            return fullPath;
        })
    );
    return files.flat();
}`
    },

    c: {
        easy: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
        medium: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("Factorial of %d is %d\\n", num, factorial(num));
    return 0;
}`,
        hard: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

void insertAtEnd(Node** head, int data) {
    Node* newNode = createNode(data);
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    Node* temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}`
    },

    cpp: {
        easy: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
        medium: `#include <iostream>
#include <vector>
using namespace std;

class Calculator {
public:
    int add(int a, int b) { return a + b; }
    int subtract(int a, int b) { return a - b; }
};

int main() {
    Calculator calc;
    cout << calc.add(5, 3) << endl;
    return 0;
}`,
        hard: `#include <iostream>
#include <memory>
#include <vector>

template<typename T>
class Stack {
private:
    std::vector<T> elements;
    
public:
    void push(const T& elem) {
        elements.push_back(elem);
    }
    
    T pop() {
        if (elements.empty()) {
            throw std::out_of_range("Stack is empty");
        }
        T elem = elements.back();
        elements.pop_back();
        return elem;
    }
    
    bool isEmpty() const {
        return elements.empty();
    }
};`
    },

    csharp: {
        easy: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
        medium: `using System;
using System.Collections.Generic;

class Person {
    public string Name { get; set; }
    public int Age { get; set; }
    
    public void Introduce() {
        Console.WriteLine($"Hi, I'm {Name}");
    }
}`,
        hard: `using System;
using System.Linq;
using System.Collections.Generic;

public interface IRepository<T> where T : class {
    IEnumerable<T> GetAll();
    T GetById(int id);
    void Add(T entity);
    void Update(T entity);
    void Delete(int id);
}

public class Repository<T> : IRepository<T> where T : class {
    private List<T> _items = new List<T>();
    
    public IEnumerable<T> GetAll() => _items;
    public T GetById(int id) => _items.ElementAtOrDefault(id);
    public void Add(T entity) => _items.Add(entity);
}`
    },

    sql: {
        easy: `SELECT * FROM users;
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');`,
        medium: `SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC;`,
        hard: `WITH RECURSIVE subordinates AS (
    SELECT employee_id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    UNION ALL
    SELECT e.employee_id, e.name, e.manager_id, s.level + 1
    FROM employees e
    INNER JOIN subordinates s ON e.manager_id = s.employee_id
)
SELECT s.level, s.name, s.employee_id,
       (SELECT COUNT(*) FROM subordinates WHERE manager_id = s.employee_id) as direct_reports
FROM subordinates s
ORDER BY s.level, s.name;`
    },

    rust: {
        easy: `fn main() {
    println!("Hello, world!");
    let x = 5;
    let y = 10;
    println!("Sum: {}", x + y);
}`,
        medium: `fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    for i in 0..10 {
        println!("fib({}) = {}", i, fibonacci(i));
    }
}`,
        hard: `use std::collections::HashMap;

struct Cache<K, V> {
    store: HashMap<K, V>,
    capacity: usize,
}

impl<K: std::hash::Hash + Eq, V> Cache<K, V> {
    fn new(capacity: usize) -> Self {
        Cache {
            store: HashMap::new(),
            capacity,
        }
    }
    
    fn get(&self, key: &K) -> Option<&V> {
        self.store.get(key)
    }
    
    fn insert(&mut self, key: K, value: V) {
        if self.store.len() >= self.capacity {
            if let Some(first_key) = self.store.keys().next().cloned() {
                self.store.remove(&first_key);
            }
        }
        self.store.insert(key, value);
    }
}`
    },

    cobol: {
        easy: `IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO-WORLD.
PROCEDURE DIVISION.
    DISPLAY 'Hello, World!'.
    STOP RUN.`,
        medium: `IDENTIFICATION DIVISION.
PROGRAM-ID. CALCULATE-SUM.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 NUM1 PIC 9(3) VALUE 100.
01 NUM2 PIC 9(3) VALUE 200.
01 RESULT PIC 9(4).
PROCEDURE DIVISION.
    ADD NUM1 TO NUM2 GIVING RESULT.
    DISPLAY 'Sum is: ' RESULT.
    STOP RUN.`,
        hard: `IDENTIFICATION DIVISION.
PROGRAM-ID. EMPLOYEE-REPORT.
DATA DIVISION.
FILE SECTION.
FD EMPLOYEE-FILE.
01 EMPLOYEE-RECORD.
   05 EMP-ID PIC 9(5).
   05 EMP-NAME PIC X(30).
   05 EMP-SALARY PIC 9(7)V99.
WORKING-STORAGE SECTION.
01 WS-EOF PIC A(1).
01 WS-TOTAL-SALARY PIC 9(9)V99 VALUE ZEROS.
PROCEDURE DIVISION.
    OPEN INPUT EMPLOYEE-FILE.
    PERFORM UNTIL WS-EOF='Y'
       READ EMPLOYEE-FILE
          AT END MOVE 'Y' TO WS-EOF
          NOT AT END
             ADD EMP-SALARY TO WS-TOTAL-SALARY
       END-READ
    END-PERFORM.
    CLOSE EMPLOYEE-FILE.
    STOP RUN.`
    },

    bash: {
        easy: `#!/bin/bash
echo "Hello, World!"
name="User"
echo "Welcome, $name"`,
        medium: `#!/bin/bash
for file in *.txt; do
    if [ -f "$file" ]; then
        echo "Processing $file"
        wc -l "$file"
    fi
done`,
        hard: `#!/bin/bash
function backup_files() {
    local src_dir="$1"
    local dest_dir="$2"
    local timestamp=$(date +%Y%m%d_%H%M%S)
    
    if [ ! -d "$src_dir" ]; then
        echo "Error: Source directory does not exist"
        return 1
    fi
    
    mkdir -p "$dest_dir"
    tar -czf "$dest_dir/backup_$timestamp.tar.gz" "$src_dir"
    
    if [ $? -eq 0 ]; then
        echo "Backup completed successfully"
    else
        echo "Backup failed"
        return 1
    fi
}

backup_files "/home/user/data" "/home/user/backups"`
    },

    cshell: {
        easy: `#!/bin/csh
echo "Hello, World!"
set name = "User"
echo "Welcome, $name"`,
        medium: `#!/bin/csh
foreach file (*.txt)
    if (-f $file) then
        echo "Processing $file"
        wc -l $file
    endif
end`,
        hard: `#!/bin/csh
set logfile = "system.log"
set date = \`date +%Y-%m-%d\`

if (! -f $logfile) then
    touch $logfile
endif

echo "$date: Starting system check" >> $logfile

foreach service (httpd mysql postgresql)
    ps aux | grep $service | grep -v grep > /dev/null
    if ($status == 0) then
        echo "$date: $service is running" >> $logfile
    else
        echo "$date: WARNING - $service is not running" >> $logfile
    endif
end`
    },

    json: {
        easy: `{
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com"
}`,
        medium: `{
    "users": [
        {
            "id": 1,
            "name": "Alice",
            "role": "admin",
            "active": true
        },
        {
            "id": 2,
            "name": "Bob",
            "role": "user",
            "active": false
        }
    ],
    "total": 2
}`,
        hard: `{
    "api": {
        "version": "2.0",
        "endpoints": [
            {
                "path": "/api/users",
                "methods": ["GET", "POST"],
                "auth": true,
                "rateLimit": {
                    "requests": 100,
                    "period": "1h"
                }
            },
            {
                "path": "/api/products/:id",
                "methods": ["GET", "PUT", "DELETE"],
                "auth": true,
                "validation": {
                    "id": {"type": "integer", "min": 1}
                }
            }
        ]
    }
}`
    },

    xml: {
        easy: `<?xml version="1.0"?>
<person>
    <name>John Doe</name>
    <age>30</age>
</person>`,
        medium: `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
    <book category="fiction">
        <title>Harry Potter</title>
        <author>J.K. Rowling</author>
        <year>1997</year>
        <price>29.99</price>
    </book>
</bookstore>`,
        hard: `<?xml version="1.0" encoding="UTF-8"?>
<configuration xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <appSettings>
        <add key="Environment" value="Production"/>
        <add key="LogLevel" value="Info"/>
    </appSettings>
    <connectionStrings>
        <add name="DefaultConnection" 
             connectionString="Server=localhost;Database=mydb;Trusted_Connection=True;"
             providerName="System.Data.SqlClient"/>
    </connectionStrings>
</configuration>`
    },

    yaml: {
        easy: `name: John Doe
age: 30
email: john@example.com`,
        medium: `server:
  port: 8080
  host: localhost
database:
  host: db.example.com
  port: 5432
  username: admin
  password: secret
logging:
  level: info
  file: app.log`,
        hard: `version: '3.8'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:8080"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
      - redis
  db:
    image: postgres:13
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: secret
volumes:
  db-data:`
    },

    csv: {
        easy: `Name,Age,City
John Doe,30,New York
Jane Smith,25,Los Angeles`,
        medium: `ID,Name,Department,Salary,Join Date
1001,Alice Johnson,Engineering,95000,2020-01-15
1002,Bob Smith,Marketing,75000,2021-03-22
1003,Carol White,Engineering,102000,2019-11-08
1004,David Brown,Sales,68000,2022-05-30`,
        hard: `OrderID,CustomerName,Product,Quantity,UnitPrice,Discount,Tax,TotalAmount,OrderDate,Status
5001,"Acme Corp","Laptop",5,1200.00,0.10,0.08,5832.00,"2024-01-15","Shipped"
5002,"Tech Solutions","Monitor",10,350.00,0.15,0.08,3213.00,"2024-01-16","Delivered"
5003,"Global Industries","Keyboard",25,75.00,0.20,0.08,1620.00,"2024-01-17","Processing"`
    },

    toml: {
        easy: `title = "Configuration"
name = "MyApp"
version = "1.0.0"`,
        medium: `[server]
host = "localhost"
port = 8080

[database]
host = "db.example.com"
port = 5432
username = "admin"
password = "secret"

[logging]
level = "info"
file = "app.log"`,
        hard: `[package]
name = "myproject"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
reqwest = "0.11"

[[bin]]
name = "server"
path = "src/main.rs"

[profile.release]
opt-level = 3
lto = true`
    },

    powershell: {
        easy: `Write-Host "Hello, World!"
$name = "User"
Write-Host "Welcome, $name"`,
        medium: `Get-ChildItem -Path "C:\\Logs" -Filter "*.log" | 
    Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) } |
    ForEach-Object {
        Write-Host "Processing $($_.Name)"
        $content = Get-Content $_.FullName
        Write-Host "Lines: $($content.Count)"
    }`,
        hard: `function Backup-Files {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SourcePath,
        [Parameter(Mandatory=$true)]
        [string]$DestinationPath
    )
    
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupName = "backup_$timestamp.zip"
    
    if (-not (Test-Path $SourcePath)) {
        Write-Error "Source path does not exist"
        return
    }
    
    New-Item -ItemType Directory -Force -Path $DestinationPath
    Compress-Archive -Path $SourcePath -DestinationPath "$DestinationPath\\$backupName"
    Write-Host "Backup completed: $backupName"
}

Backup-Files -SourcePath "C:\\Data" -DestinationPath "C:\\Backups"`
    },

    dos: {
        easy: `@echo off
echo Hello, World!
set name=User
echo Welcome, %name%`,
        medium: `@echo off
for %%f in (*.txt) do (
    echo Processing %%f
    find /c /v "" %%f
)
echo Done!`,
        hard: `@echo off
setlocal enabledelayedexpansion

set "source=C:\\Data"
set "backup=C:\\Backups"
set "date=%date:~-4%%date:~-7,2%%date:~-10,2%"

if not exist "%source%" (
    echo Error: Source directory does not exist
    exit /b 1
)

if not exist "%backup%" mkdir "%backup%"

xcopy "%source%" "%backup%\\backup_%date%\\" /E /I /Y

if %errorlevel% equ 0 (
    echo Backup completed successfully
) else (
    echo Backup failed
    exit /b 1
)

endlocal`
    }
};

window.CodeSamples = CodeSamples;
