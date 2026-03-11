import ProjectTitle from "../components/about/ProjectTitle";
import ProblemStatement from "../components/about/ProblemStatement";
import ProjectObjective from "../components/about/ProjectObjective";
import TechStack from "../components/about/TechStack";
import SystemArchitecture from "../components/about/SystemArchitecture";
import AuthenticationMethods from "../components/about/AuthenticationMethods";
import KeyFeatures from "../components/about/KeyFeatures";
import DatabaseDesign from "../components/about/DatabaseDesign";
import AuthenticationFlow from "../components/about/AuthenticationFlow";
import Conclusion from "../components/about/Conclusion";

export default function About() {
  return (
    <div>
      <ProjectTitle />
      <ProblemStatement />
      <ProjectObjective />
      <TechStack />
      <SystemArchitecture />
      <AuthenticationMethods />
      <KeyFeatures />
      <DatabaseDesign />
      <AuthenticationFlow />
      <Conclusion />
    </div>
  );
}