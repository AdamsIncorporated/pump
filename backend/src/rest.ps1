$jsonData = @{
    table_name = "lift"
    data       = @(
        @{ exercise = "Squat"; sets = 3; reps = 10; weight_lbs = 225 }
        @{ exercise = "Deadlift"; sets = 4; reps = 8; weight_lbs = 275 }
        @{ exercise = "Bench Press"; sets = 4; reps = 6; weight_lbs = 185 }
    )
} | ConvertTo-Json -Depth 3

Invoke-RestMethod -Uri "http://localhost:5000/create" -Method Post -Body $jsonData -ContentType "application/json"
