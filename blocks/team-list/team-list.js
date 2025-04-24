import { div, p, h3, ul, li } from '../../scripts/dom-helpers.js';

async function fetchData() {
    try {
        const response = await fetch(('https://author-p48457-e1275402.adobeaemcloud.com/graphql/execute.json/company-framewok/person-by-name'), {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();
        return data;

    } catch (error) {
        return console.error('Error fetching data:', error);
    }
};

export default async function decorate(block) {
    const entries = await fetchData();
    const teamList = entries.data.teamList.items;
    //   console.log(entries)

    block.firstElementChild.append(
        ...teamList.map((item) => {
            const memberList = ul({ class: 'member-list' });

            for (const member of item.teamMembers) {
                memberList.append(
                    li(member.fullName)
                );
            }
            return div(
                { class: 'teamlist-card' },
                div({ class: 'teamlist-heading' },
                    h3({ class: 'team-name' }, item.title),
                    p({ class: 'team-description' }, item.description.plaintext),
                ),
                div(
                    { class: 'teamlist-content' },
                    p({ class: 'members-heading' }, 'MEMBERS'),
                    memberList,
                )
            );
        })
    );
}