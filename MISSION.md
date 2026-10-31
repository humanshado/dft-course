# Mission: Density Functional Theory with Quantum ESPRESSO

## Why
Run, converge and defend DFT calculations in Quantum ESPRESSO for a PhD research project and thesis — understanding the theory deeply enough to choose settings, diagnose failures, and justify results to a supervisor, reviewers and a thesis committee.

## Success looks like
- Install Quantum ESPRESSO on a laptop and run `pw.x` on a bulk crystal from a hand-written input file
- Converge cutoff energy and k-point mesh, and explain *why* each convergence test is needed
- Compute lattice constants, relaxed structures, band structures and densities of states
- Choose an exchange–correlation functional and pseudopotential and defend the choice
- Diagnose an SCF that won't converge, and know when a DFT number can't be trusted (e.g. band gaps)
- Explain Hohenberg–Kohn and Kohn–Sham at the level expected in a PhD viva
- Read the methods section of a DFT paper critically

## Constraints
- Laptop only (for now): small cells, modest cutoffs; heavier work later on a cluster
- Visual learner: every lesson needs diagrams or interactive visuals
- Calculation-first: derivations only where they improve how calculations are run
- Starting from undergrad physics/chemistry with rusty quantum mechanics
- Specific research application to be decided later; time per week not yet stated

## Out of scope (for now)
- Writing a DFT code from scratch
- Rigorous mathematical DFT (v-representability, functional analysis) beyond what calculations need
- Gaussian-basis molecular codes (Gaussian, ORCA) — QE is plane-wave; molecules handled "in a box"
