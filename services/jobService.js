const getJobsFromJSearch = async (profile) => {
    try {
        const query = `${profile.jobTitle}` ?? "";
        const response = await fetch(
            `https://jsearch.p.rapidapi.com/search-v2?query=${encodeURIComponent(query)}&num_pages=1&country=pk&date_posted=all`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
                    "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
                }
            }
        );
        const data = await response.json();
        const jobs = (data.data.jobs || []).map((job) => ({
            id: job.job_id,
            title: job.job_title,
            company: job.employer_name || "Unknown",
            location:
                job.job_city
                    ? `${job.job_city}, ${job.job_country}`
                    : "Remote",
            description:
                job.job_description
                    ?.substring(0, 200) + "...",
            url: job.job_apply_link
        }));
        
        return jobs;
    } catch (error) {
        console.log("JSearch Error:", error.message);
        throw error;
    }
}
module.exports = {
    getJobsFromJSearch
}