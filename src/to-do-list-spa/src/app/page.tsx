import { PageTitle } from "@/components/page-title/page-title";
import { TaskForm } from "@/components/task-form/task-form";
import { TaskList } from "@/components/task-list/task-list";

import "./page.scss";

export default function Home() {
  return (
    <>
      <PageTitle />
      <div className="vintage-grid" aria-labelledby="pageTitle">
        {/* FORM */}
        <section>
          <TaskForm />
        </section>
        {/* TASKS */}
        <section>
          <TaskList />
        </section>
      </div>
    </>
  );
}
