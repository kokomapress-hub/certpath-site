#!/usr/bin/env python3
"""Turn data/free/*.json into auditor packets (plain text) for an external reviewer (ChatGPT).
Usage: python3 scripts/make-audit-packets.py <out-dir> [bank ...]"""
import glob, json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = sys.argv[1]; only = set(sys.argv[2:])
os.makedirs(out, exist_ok=True)
NAMES = {"cast":"EEI CAST (Construction and Skilled Trades)","poss":"EEI POSS (Plant Operator Selection System)","mech-apt":"Mechanical aptitude (BMCT/Wiesen/Ramsay style)",
 "journeyman-elec":"Journeyman electrician licensing exam (2026 NEC: Article 220 renumbered to 120; dwelling lighting 2 VA/sq ft for service/feeder, 3 VA/sq ft for branch-circuit count)",
 "csp":"BCSP Certified Safety Professional (CSP11)","chst":"BCSP Construction Health and Safety Technician","tabe-a":"TABE 11&12 Math Level A","tabe-d":"TABE 11&12 Math Level D",
 "tabe-m":"TABE 11&12 Math Level M","tabe-e":"TABE 11&12 Math Level E","sat-math":"Digital SAT Math","psat-math":"Digital PSAT/NMSQT Math","act-math":"Enhanced ACT Math",
 "ged-math":"GED Mathematical Reasoning","asvab-math":"ASVAB Arithmetic Reasoning + Mathematics Knowledge (no calculator)","ccrn":"AACN Adult CCRN","cmsrn":"MSNCB CMSRN","cnor":"CCI CNOR",
 "pmp":"PMP (July 2026 ECO, PMBOK 8)","capm":"CAPM (2023 ECO)","pmi-acp":"PMI-ACP","cap":"IAAP Certified Administrative Professional"}
for f in sorted(glob.glob(os.path.join(ROOT, "data", "free", "*.json"))):
    bank = os.path.basename(f)[:-5]
    if only and bank not in only: continue
    qs = json.load(open(f, encoding="utf-8"))["tests"][0]["questions"]
    lines = [f"BANK: {bank} — {NAMES.get(bank, bank)} — {len(qs)} items", ""]
    for q in qs:
        lines.append(f"[{bank}-{q['num']}] ({q.get('topic','')})")
        lines.append(q["question"])
        if q.get("image"): lines.append(f"  [FIGURE attached as {os.path.basename(q['image']).replace('.svg', '.png')} — {q.get('image_alt', '')}]")
        for L, c in zip("ABCD", q["choices"]): lines.append(f"  {L}. {c}")
        lines.append(f"  KEY: {q['answer']}")
        lines.append(f"  EXPLANATION: {q['explanation']}")
        lines.append("")
    open(os.path.join(out, f"audit-{bank}.txt"), "w", encoding="utf-8").write("\n".join(lines))
    print(bank, len(qs), "items,", sum(len(l) for l in lines), "chars")
