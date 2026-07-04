$pw = "changeme"

# GET existing items
$r = Invoke-WebRequest -Uri "http://localhost:3000/api/admin/update?password=$pw" -UseBasicParsing -TimeoutSec 10
$list = $r.Content | ConvertFrom-Json
if ($list.items.Count -eq 0) {
    Write-Host "No items found, creating one..."
    $body = @{password=$pw; title="Test Item"; type="news-interview"; outlet="Test Source"; eventDate="2026-01-01"; imageUrl="https://lta728bgzhdzmrde.private.blob.vercel-storage.com/images/test.png?token=fake"} | ConvertTo-Json
    $r2 = Invoke-WebRequest -Uri "http://localhost:3000/api/admin/update" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -TimeoutSec 15
    Write-Host "POST status: $($r2.StatusCode)"
    $r = Invoke-WebRequest -Uri "http://localhost:3000/api/admin/update?password=$pw" -UseBasicParsing -TimeoutSec 10
    $list = $r.Content | ConvertFrom-Json
}

$firstId = $list.items[0]._id
Write-Host "Editing item: $firstId"
Write-Host "Before edit imageUrl: $($list.items[0].imageUrl)"

# Update with a new imageUrl
$body2 = @{password=$pw; _id=$firstId; title="Updated Title"; type="news-interview"; outlet="Updated Outlet"; eventDate="2026-06-01"; imageUrl="https://lta728bgzhdzmrde.private.blob.vercel-storage.com/images/new-image_rand.png?token=newtoken"} | ConvertTo-Json
$r3 = Invoke-WebRequest -Uri "http://localhost:3000/api/admin/update" -Method PUT -Body $body2 -ContentType "application/json" -UseBasicParsing -TimeoutSec 15
Write-Host "PUT status: $($r3.StatusCode)"

# Verify
$r4 = Invoke-WebRequest -Uri "http://localhost:3000/api/admin/update?password=$pw" -UseBasicParsing -TimeoutSec 10
$list2 = $r4.Content | ConvertFrom-Json
$updated = $list2.items | Where-Object { $_._id -eq $firstId }
Write-Host "After edit imageUrl: $($updated.imageUrl)"
if ($updated.imageUrl -match '^/api/blob') {
    Write-Host "PASS: imageUrl is proxy URL"
} else {
    Write-Host "FAIL: imageUrl is NOT proxy: $($updated.imageUrl)"
}
