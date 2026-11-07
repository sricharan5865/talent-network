import json

with open('.agents/teamwork/teamwork_explorer_survey_3/screen_inventory_v2.json', 'r', encoding='utf-8') as f:
    screens = json.load(f)

print("=== EMPLOYER & RECRUITER TALENT / JOBS SCREENS ===")
for s in screens:
    mod = s.get('Module', '')
    if any(k in mod for k in ['Employer', 'Recruiter']):
        sid = s.get('Screen ID')
        page = s.get('Screen / Page')
        status = s.get('Implementation Status')
        route = s.get('Implemented Route / Component')
        notes = s.get('Implementation Notes & Progress', '')
        print(f"{sid} | [{mod}] {page} | Status: {status} | Route: {route}")
        if notes:
            print(f"   Notes: {notes[:120]}")
