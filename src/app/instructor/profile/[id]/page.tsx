import { INSTRUCTORS, getInstructorById, getCoursesForInstructor } from "@/lib/instructors";
import InstructorHeader from "@/components/instructor/instructorProfileHeader";
import InstructorStats from "@/components/instructor/instructorStats";
import CourseListByInstructor from "@/components/instructor/courseListbyInstructor"
import InstructorLayout from "../../instructorlayout";

type Props = {
    params: { id: string };
};

export default function InstructorProfilePage({ params }: Props) {
    const instructorId = Number(params.id);
    const instructor = getInstructorById(instructorId);

    if (!instructor)
        return (
            <div className="p-10 text-center text-xl font-semibold">
                Instructor not found.
            </div>
        );

    const courses = getCoursesForInstructor(instructorId);

    return (
        <InstructorLayout>
            <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
                <InstructorHeader instructor={instructor} />
                <InstructorStats courses={courses} />
                <CourseListByInstructor courses={courses} />
            </div>
        </InstructorLayout>
    );
}
