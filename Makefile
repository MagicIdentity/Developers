B_ON := "\\033[1m"
U_ON := "\\033[4m"
R_ON := "\\033[7m"
OFF := "\\033[0m"

.PHONY: help main-help
help: main-help run-help

main-help:
	@echo "${R_ON}Developer Documentation for Web Daemon${OFF}"
	@echo
	@echo "The developer docs are deployed to Github Pages and built using"
	@echo "Jekyll. The theme is referenced in ${B_ON}_config.yml${OFF}."
	@echo
	@echo "The docs use Mermaid for diagrams. Note the overrides of certain "
	@echo "default pages in the ${B_ON}_includes${OFF} and ${B_ON}_layouts${OFF}"
	@echo "directories."
	@echo
	@echo "${U_ON}Targets${OFF}"
	@echo

.PHONY: run run-help
run:
	@cd docs && bundle exec jekyll serve

run-help:
	@echo "${B_ON}run${OFF}"
	@echo "  Generates and serves the doc pages."
	@echo
